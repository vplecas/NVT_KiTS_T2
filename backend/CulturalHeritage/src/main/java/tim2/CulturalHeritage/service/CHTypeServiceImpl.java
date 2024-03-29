package tim2.CulturalHeritage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import tim2.CulturalHeritage.model.CHType;
import tim2.CulturalHeritage.repository.CHTypeRepository;

import javax.persistence.EntityNotFoundException;

@Service
public class CHTypeServiceImpl implements CHTypeService {

    @Autowired
    private CHTypeRepository chTypeRepository;

    public Page<CHType> findAll(Pageable page) {
        return chTypeRepository.findAll(page);
    }

    @Override
    public CHType findById(Long id) {
        return chTypeRepository.findById(id).orElse(null);
    }

    @Override
    public CHType add(CHType chType) {
        return chTypeRepository.save(chType);
    }

    @Override
    public CHType update(CHType chType) {
        CHType type = chTypeRepository.findById(chType.getId()).orElse(null);
        if (type == null) {
            throw new EntityNotFoundException();
        }
        return chTypeRepository.save(chType);
    }

    @Override
    public void deleteById(Long id) {
        chTypeRepository.deleteById(id);
    }

}
