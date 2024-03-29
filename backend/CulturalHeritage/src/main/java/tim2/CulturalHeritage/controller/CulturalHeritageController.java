package tim2.CulturalHeritage.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import tim2.CulturalHeritage.dto.requestDTO.CulturalHeritageRequestDTO;
import tim2.CulturalHeritage.dto.requestDTO.FilterRequestDTO;
import tim2.CulturalHeritage.dto.responseDTO.CulturalHeritageResponseDTO;
import tim2.CulturalHeritage.helper.CulturalHeritageMapper;
import tim2.CulturalHeritage.model.CulturalHeritage;
import tim2.CulturalHeritage.service.CulturalHeritageService;

@RestController
@RequestMapping("/api/cultural-heritages")
public class CulturalHeritageController {

    @Autowired
    private CulturalHeritageService culturalHeritageService;

    private static CulturalHeritageMapper chMapper = new CulturalHeritageMapper();

    @GetMapping(path = "/by-page")
    public ResponseEntity<Page<CulturalHeritageResponseDTO>> getAllCulturalHeritages(Pageable pageable) {

        Page<CulturalHeritage> page = culturalHeritageService.findAll(pageable);
        List<CulturalHeritageResponseDTO> DTOs = chMapper.toDtoList(page.toList());
        Page<CulturalHeritageResponseDTO> pageResponse = new PageImpl<>(DTOs, page.getPageable(),
                page.getTotalElements());

        return new ResponseEntity<>(pageResponse, HttpStatus.OK);
    }

    @PostMapping(path = "/filtered")
    public ResponseEntity<Page<CulturalHeritageResponseDTO>> filterCulturalHeritages(Pageable page,
            @RequestBody FilterRequestDTO filterDTO) {

        Page<CulturalHeritage> chPage = culturalHeritageService.filter(filterDTO, page);

        List<CulturalHeritage> chList = chPage.getTotalElements() > 0 ? chPage.toList() : new ArrayList<CulturalHeritage>();
        List<CulturalHeritageResponseDTO> DTOs = chMapper.toDtoList(chList);
        Page<CulturalHeritageResponseDTO> pageResponse = new PageImpl<>(DTOs, chPage.getPageable(),
                chPage.getTotalElements());

        return new ResponseEntity<>(pageResponse, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<CulturalHeritageResponseDTO> findById(@PathVariable Long id) {

        CulturalHeritage ch = culturalHeritageService.findById(id);

        if (ch == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        CulturalHeritageResponseDTO response = chMapper.toDto(ch);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<CulturalHeritageResponseDTO> add(@RequestPart("file") MultipartFile file,
            @RequestPart("culturalHeritageRequestDTO") CulturalHeritageRequestDTO culturalHeritageRequestDTO) {

        CulturalHeritage ch = chMapper.toEntity(culturalHeritageRequestDTO);
        ch = culturalHeritageService.add(ch, file);

        CulturalHeritageResponseDTO response = new CulturalHeritageResponseDTO();
        response = chMapper.toDto(ch);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CulturalHeritageResponseDTO> update(@RequestPart("file") MultipartFile file,
            @RequestPart("culturalHeritageRequestDTO") CulturalHeritageRequestDTO culturalHeritageRequestDTO,
            @PathVariable Long id) {

        CulturalHeritage culturalHeritage = chMapper.toEntity(culturalHeritageRequestDTO);
        culturalHeritage.setId(id);

        try {
            culturalHeritageService.update(culturalHeritage, file);

            CulturalHeritageResponseDTO response = chMapper.toDto(culturalHeritage);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println("Greska: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        try {
            culturalHeritageService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } 
        catch(DataIntegrityViolationException e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/unsubscribe/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> unsubscribe(@PathVariable Long id) {

        try {
            culturalHeritageService.unsubscribe(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/subscribe/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> subscribe(@PathVariable Long id) {

        try {
            culturalHeritageService.subscribe(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
