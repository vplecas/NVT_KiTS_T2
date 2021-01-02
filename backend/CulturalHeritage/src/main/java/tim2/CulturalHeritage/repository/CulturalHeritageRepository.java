package tim2.CulturalHeritage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tim2.CulturalHeritage.model.CulturalHeritage;

@Repository
public interface CulturalHeritageRepository extends JpaRepository<CulturalHeritage, Long> {

    Page<CulturalHeritage> findByNameContains(String name, Pageable page);

    Page<CulturalHeritage> findByChsubtypeNameContains(String chSubtypeName, Pageable page);

    Page<CulturalHeritage> findByLocationCity(String city, Pageable page);

    Page<CulturalHeritage> findByLocationCountry(String country, Pageable page);


}