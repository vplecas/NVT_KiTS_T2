package tim2.CulturalHeritage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "news")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "heading", nullable = false)
    private String heading;

    @Column(name = "content")
    private String content;

    @ManyToOne
    private CulturalHeritage culturalHeritage;

    @ManyToOne
    private Admin admin;


    @OneToOne
    private FileDB images;

    public News() {
    }

    public News(Long id, String heading, String content, CulturalHeritage culturalHeritage, Admin admin, FileDB images) {
        this.id = id;
        this.heading = heading;
        this.content = content;
        this.culturalHeritage = culturalHeritage;
        this.admin = admin;
        this.images = images;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeading() {
        return this.heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public CulturalHeritage getCulturalHeritage() {
        return this.culturalHeritage;
    }

    public void setCulturalHeritage(CulturalHeritage culturalHeritage) {
        this.culturalHeritage = culturalHeritage;
    }

    public Admin getAdmin() {
        return this.admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public FileDB getImages() {
        return this.images;
    }

    public void setImages( FileDB images) {
        this.images = images;
    }

}
