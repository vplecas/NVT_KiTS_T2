package tim2.CulturalHeritage.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import tim2.CulturalHeritage.model.AuthenticatedUser;
import tim2.CulturalHeritage.model.Comment;
import tim2.CulturalHeritage.model.CulturalHeritage;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static tim2.CulturalHeritage.constants.CommentConstants.*;
import static tim2.CulturalHeritage.constants.CulturalHeritageConstants.CH_ID;
import static tim2.CulturalHeritage.constants.CulturalHeritageConstants.CH_ID_NOT_FOUND;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:test.properties")
public class CommentServiceIntegrationTest {

    @Autowired
    CommentService commentService;

    private HttpHeaders headers;

    Pageable pageable = PageRequest.of(PAGE_NUM, PAGE_SIZE);

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void addValidWithoutFile() {
        Comment com = new Comment();
        AuthenticatedUser user = new AuthenticatedUser();
        user.setId(USER_ID);
        CulturalHeritage ch = new CulturalHeritage();
        ch.setId(CH_ID);
        com.setAuthenticatedUser(user);
        com.setContent(CONTENT);
        com.setCulturalHeritage(ch);

        MockMultipartFile file = null;
        Comment created = commentService.add(com, file);
        assertEquals(CONTENT, created.getContent());
        assertEquals(USER_ID, created.getAuthenticatedUser().getId());
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void addValidWithFile() throws IOException {
        Comment com = new Comment();
        AuthenticatedUser user = new AuthenticatedUser();
        user.setId(USER_ID);
        CulturalHeritage ch = new CulturalHeritage();
        ch.setId(CH_ID);
        com.setAuthenticatedUser(user);
        com.setContent(CONTENT);
        com.setCulturalHeritage(ch);

        File image = new File(IMAGE_SRC);
        byte[] imageBytes = Files.readAllBytes(image.toPath());
        MockMultipartFile file = new MockMultipartFile("file", "image.jpg", MediaType.IMAGE_JPEG_VALUE, imageBytes);

        Comment created = commentService.add(com, file);
        assertEquals(CONTENT, created.getContent());
        assertEquals(USER_ID, created.getAuthenticatedUser().getId());
    }

    @Test(expected = DataIntegrityViolationException.class)
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void addMissingContent() {
        Comment com = new Comment();
        AuthenticatedUser user = new AuthenticatedUser();
        user.setId(USER_ID);
        CulturalHeritage ch = new CulturalHeritage();
        ch.setId(CH_ID);
        com.setAuthenticatedUser(user);
        com.setContent(NULL_CONTENT);
        com.setCulturalHeritage(ch);
        MockMultipartFile file = null;

        // Comment created =
        commentService.add(com, file);
    }

    @Test(expected = NullPointerException.class)
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void addMissingCh() {
        Comment com = new Comment();
        AuthenticatedUser user = new AuthenticatedUser();
        user.setId(USER_ID);

        com.setAuthenticatedUser(user);
        com.setContent(CONTENT);
        MockMultipartFile file = null;

        // Comment created =
        commentService.add(com, file);
    }

    @Test(expected = EntityNotFoundException.class)
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void delete_idNotExists_() {

        commentService.deleteById(ID_NOT_EXISTS);
    }

    @Test
    public void findById_idOk_comment() {

        Comment comment = commentService.findById(ID_OK);

        assertNotNull(comment);
        assertEquals(comment.getId(), ID_OK);
        assertEquals(comment.getContent(), CONTENT_1);
    }

    @Test
    public void findById_idNotExists_null() {

        Comment comment = commentService.findById(ID_NOT_EXISTS);

        assertNull(comment);
    }

    @Test
    public void findAllForCHValid() {

        Pageable pageable = PageRequest.of(PAGE_NUM, PAGE_SIZE);

        Page<Comment> commPage = commentService.findAll(pageable, CH_ID);

        List<Comment> commList = commPage.getContent();
        assertEquals(commList.size(),NUMBER_OF_COMMENTS_IN_DB);
    }

    @Test(expected = IllegalArgumentException.class)
    public void findAllForCHNull() {

        Pageable pageable = PageRequest.of(PAGE_NUM, PAGE_SIZE);

        commentService.findAll(pageable, null);
    }

    @Test(expected = EntityNotFoundException.class)
    public void findAllForCHInvalid() {

        Pageable pageable = PageRequest.of(PAGE_NUM, PAGE_SIZE);

        commentService.findAll(pageable, CH_ID_NOT_FOUND);
    }
}
