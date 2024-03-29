package tim2.CulturalHeritage.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static tim2.CulturalHeritage.constants.NewsConstants.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.MethodMode;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;

import tim2.CulturalHeritage.dto.requestDTO.AuthUserLoginDTO;
import tim2.CulturalHeritage.dto.requestDTO.NewsRequestDTO;
import tim2.CulturalHeritage.dto.responseDTO.AuthUserLoginResponseDTO;
import tim2.CulturalHeritage.dto.responseDTO.NewsResponseDTO;
import tim2.CulturalHeritage.service.NewsService;

import static org.junit.jupiter.api.Assertions.assertNull;
import static tim2.CulturalHeritage.constants.LoginConstants.*;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import tim2.CulturalHeritage.model.News;
import tim2.CulturalHeritage.restTemplateHelp.RestResponsePage;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class NewsControllerIntegrationTest {

  @Autowired
  private TestRestTemplate restTemplate;

  @Autowired
  private NewsService newsService;

  private Pageable pageable = PageRequest.of(0, PAGE_SIZE);

  
  @Test
  public void findById_ValidId_ShouldReturnNews() {

    ResponseEntity<NewsResponseDTO> responseEntity = restTemplate.getForEntity("/api/news/1", NewsResponseDTO.class);

    NewsResponseDTO newsResponseDTO = responseEntity.getBody();
    assertEquals("Naslov1", newsResponseDTO.getHeading());
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
  }

  @Test
  public void findById_InvalidId_ShouldReturnNotFound() {

    ResponseEntity<NewsResponseDTO> responseEntity = restTemplate.getForEntity("/api/news/100", NewsResponseDTO.class);

    NewsResponseDTO newsResponseDTO = responseEntity.getBody();
    assertNull(newsResponseDTO);
    assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
  }

  public HttpHeaders login() {

    ResponseEntity<AuthUserLoginResponseDTO> responseEntity = restTemplate.postForEntity("/auth/login",
        new AuthUserLoginDTO(ADMIN_EMAIL, ADMIN_PASS), AuthUserLoginResponseDTO.class);

    String accessToken = "Bearer " + responseEntity.getBody().getAccessToken();

    HttpHeaders authHeaders = new HttpHeaders();
    authHeaders.add("Authorization", accessToken);
    // auth headers cant be json because of a file
    // authHeaders.setContentType(MediaType.APPLICATION_JSON);
    return authHeaders;
  }

  private HttpEntity<LinkedMultiValueMap<String, Object>> createFormData(NewsRequestDTO newsRequestDTO, String path) {

    // Dto is param -> body -> form data
    // set JSON content type for dto.
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<NewsRequestDTO> dto = new HttpEntity<>(newsRequestDTO, headers);

    // params map is corresponding to form data when sending request
    // params map should contains file (multipart file) and news dto as json
    LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<String, Object>();

    // add multipart file to params (to form data when sending request) if file is
    // passed
    if (null == path || "".equals(path)) {
      params.add("file", null);
    } else {
      params.add("file", new FileSystemResource(path));
    }

    // add dto obj to params (to form data when sending request)
    params.add("news", dto);

    // add authentication headers when sending request (add admin)
    HttpHeaders headersAuth = login();
    return new HttpEntity<>(params, headersAuth);
  }

  @Test
  @DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
  public void add_WithFile_ShouldReturnNews() {

    NewsRequestDTO newsRequestDTO = new NewsRequestDTO(null, HEADING, CONTENT, 1, 1);
    String imgPath = "src/test/resources/cultural-heritage-management.jpg";

    HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = createFormData(newsRequestDTO, imgPath);

    ResponseEntity<NewsResponseDTO> responseEntity = restTemplate.postForEntity("/api/news", requestEntity,
        NewsResponseDTO.class);

    NewsResponseDTO newsResponseDTO = responseEntity.getBody();
    assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
    assertEquals(HEADING, newsResponseDTO.getHeading());
    assertEquals(NUMBER_OF_NEWS_IN_DB + 1, newsService.findAll(pageable).getNumberOfElements());
  }

  @Test
  @DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
  public void add_WithoutFile_ShouldBadRequest() {

    NewsRequestDTO newsRequestDTO = new NewsRequestDTO(null, HEADING, CONTENT, 1, 1);

    HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = createFormData(newsRequestDTO, "");

    ResponseEntity<NewsResponseDTO> responseEntity = restTemplate.postForEntity("/api/news", requestEntity,
        NewsResponseDTO.class);

    assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    assertEquals(NUMBER_OF_NEWS_IN_DB, newsService.findAll(pageable).getNumberOfElements());
  }

  @Test
  @DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
  public void update_ValidID_ShouldReturnNews() {

    NewsRequestDTO newsRequestDTO = new NewsRequestDTO(null, HEADING, CONTENT, 1, 1);
    String imgPath = "src/test/resources/cultural-heritage-management.jpg";

    HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = createFormData(newsRequestDTO, imgPath);

    ResponseEntity<NewsResponseDTO> responseEntity = restTemplate.exchange("/api/news/" + NEWS_ID, HttpMethod.PUT,
        requestEntity, NewsResponseDTO.class);

    NewsResponseDTO newsResponseDTO = responseEntity.getBody();
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(HEADING, newsResponseDTO.getHeading());
    assertEquals(NUMBER_OF_NEWS_IN_DB, newsService.findAll(pageable).getNumberOfElements());
  }

  @Test
  @DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
  public void update_InvalidID_ShouldReturnNotFound() {

    NewsRequestDTO newsRequestDTO = new NewsRequestDTO(null, HEADING, CONTENT, 1, 1);
    String imgPath = "src/test/resources/cultural-heritage-management.jpg";

    HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = createFormData(newsRequestDTO, imgPath);

    ResponseEntity<NewsResponseDTO> responseEntity = restTemplate.exchange("/api/news/" + NEWS_ID_NOT_FOUND,
        HttpMethod.PUT, requestEntity, NewsResponseDTO.class);

    assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
  }

  @Test
  @DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
  public void delete_NotLoggedIn_ShouldReturnUNAUTHORIZED() {

    ResponseEntity<Void> responseEntity = restTemplate.exchange("/api/news/" + NEWS_ID, HttpMethod.DELETE, null,
        Void.class);

    assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
  }

  @Test
  @DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
  public void delete_LoggedInValidID_ShouldDelete() {

    HttpHeaders authHeaders = login();
    HttpEntity<Object> requestEntity = new HttpEntity<Object>(null, authHeaders);

    ResponseEntity<Void> responseEntity = 
      restTemplate.exchange("/api/news/" + NEWS_ID, HttpMethod.DELETE, requestEntity ,Void.class );
  
    assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    assertEquals(NUMBER_OF_NEWS_IN_DB -1, newsService.findAll(pageable).getNumberOfElements());

  }

  @Test
  @DirtiesContext(methodMode = MethodMode.AFTER_METHOD)
  public void delete_InvalidID_ShouldNotDelete() {

    HttpHeaders authHeaders = login();
    HttpEntity<Object> requestEntity = new HttpEntity<Object>(null, authHeaders);

    ResponseEntity<Void> responseEntity = 
    restTemplate.exchange("/api/news/" + NEWS_ID_NOT_FOUND, HttpMethod.DELETE, requestEntity ,Void.class );
  
  assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
  assertEquals(NUMBER_OF_NEWS_IN_DB , newsService.findAll(pageable).getNumberOfElements());
  }

  
  @Test
  public void findAll_ok_listAndOk(){
    Page<News> newsPage = newsService.findAll(pageable);
    List<News> newsList = newsPage.getContent();

    int size = newsList.size();

    ParameterizedTypeReference<RestResponsePage<NewsResponseDTO>> responseType = 
      new ParameterizedTypeReference<RestResponsePage<NewsResponseDTO>>() {};
    
    ResponseEntity<RestResponsePage<NewsResponseDTO>> responseEntity = restTemplate
    .exchange("/api/news/by-page/?page=0&size=5&sort=id,ASC", HttpMethod.GET, null, responseType);

    List<NewsResponseDTO> responseList = responseEntity.getBody().getContent();

    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(responseList.size(), size);
    
  }


  @Test
  public void findAllForCH_chIdOk_listAndOk() {

    Pageable pageable = PageRequest.of(0, PAGE_SIZE);
    Page<News> newsPage = newsService.findAll(pageable, CH_ID);
    List<News> newsList = newsPage.getContent();

    int size = newsList.size();

    ParameterizedTypeReference<RestResponsePage<NewsResponseDTO>> responseType = new ParameterizedTypeReference<RestResponsePage<NewsResponseDTO>>() {
    };

    ResponseEntity<RestResponsePage<NewsResponseDTO>> responseEntity = restTemplate
        .exchange("/api/news/by-page/1/?page=0&size=5&sort=id,ASC", HttpMethod.GET, null/* httpEntity */, responseType);

    List<NewsResponseDTO> responseList = responseEntity.getBody().getContent();

    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(responseList.size(), size);
  }

  @Test
  public void findAllForCH_chIdNotExists_listAndOk() {

    ParameterizedTypeReference<RestResponsePage<NewsResponseDTO>> responseType = new ParameterizedTypeReference<RestResponsePage<NewsResponseDTO>>() {
    };

    ResponseEntity<RestResponsePage<NewsResponseDTO>> responseEntity = restTemplate.exchange(
        "/api/news/by-page/" + CH_ID_NOT_EXISTS + "/?page=0&size=5&sort=id,ASC", HttpMethod.GET, null/* httpEntity */,
        responseType);

    assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
  }

}
