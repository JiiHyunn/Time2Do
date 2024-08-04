package Time2Do.oauth.domain.authcode;

import Time2Do.oauth.domain.OauthServerType;

public interface AuthCodeRequestUrlProvider {

    OauthServerType supportServer();

    String provide();
}