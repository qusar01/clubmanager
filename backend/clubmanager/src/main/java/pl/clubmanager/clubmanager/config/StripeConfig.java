package pl.clubmanager.clubmanager.config;


import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    @Value("${stripe.sk}")
    private String secretKey;

    public StripeConfig() {
        Stripe.apiKey = secretKey;
    }
}
