package tim2.CulturalHeritage.model;

import javax.persistence.*;


@Entity
@Table(name = "chsubtype",
        uniqueConstraints = {@UniqueConstraint(columnNames={"chType_id", "name"})})
public class CHSubtype {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private CHType chtype;

    public CHSubtype() {
    }

    public CHSubtype(Long id, String name, CHType chtype) {
        this.id = id;
        this.name = name;
        this.chtype = chtype;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CHType getChtype() {
        return this.chtype;
    }

    public void setChtype(CHType chtype) {
        this.chtype = chtype;
    }

}
