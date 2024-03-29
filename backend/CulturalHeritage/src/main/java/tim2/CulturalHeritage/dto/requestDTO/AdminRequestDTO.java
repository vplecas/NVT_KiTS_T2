package tim2.CulturalHeritage.dto.requestDTO;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AdminRequestDTO {

    @NotBlank(message="Name cannot be blank")
    private String firstName;

    @NotBlank(message="Last name cannot be blank")
    private String lastName;

    @Email(message="Email must be valid email address")
    private String email;

    @NotBlank(message="Password cannot be blank")
    private String password;


    public AdminRequestDTO(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public AdminRequestDTO() {};

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
