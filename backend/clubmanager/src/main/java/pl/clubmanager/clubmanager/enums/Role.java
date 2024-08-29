package pl.clubmanager.clubmanager.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    OWNER,
    COMPETITOR,
    COACH;

    @Override
    public String getAuthority() {
        return this.name();
    }
}
