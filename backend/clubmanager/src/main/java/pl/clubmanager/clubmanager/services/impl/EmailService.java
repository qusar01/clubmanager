package pl.clubmanager.clubmanager.services.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);

        mailSender.send(message);
    }

    public void sendForgotPasswordEmail(String subject, String email) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText("""
                <div>
                    <h1>Resetowanie hasla</h1>
                    <p>Witaj, aby zresetowac haslo kliknij w ponizszy link:</p>
                    <a href="http://localhost:3000/set-password?email=%s">Resetuj haslo</a>
                </div>
                """.formatted(email), true);

        mailSender.send(message);
    }

    public void sendInvitationEmail(String to, String subject, String link) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText("""
                <div>
                    <h1>Zaproszenie do klubu</h1>
                    <p>Witaj, zostales zaproszony do klubu. Kliknij w ponizszy link aby dolaczyc:</p>
                    <a href="%s">Dolacz do klubu</a>
                </div>
                """.formatted(link), true);

        mailSender.send(message);
    }

}
