import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink
} from "./FooterStyles";
// import SocialFollow from "./SocialFollow";


const Footer = () => {
  return (
    <Box>
      <Container>
      {/* <SocialFollow /> */}
        <Row>
          <Column>
            <FooterLink href="/contact-us">Contact Us</FooterLink>
            <FooterLink href="/terms-and-conditions">Term and Condition</FooterLink>
          </Column>
          <Column>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/legal-notices">Legal Notices</FooterLink>
          </Column>
          <Column>
            <FooterLink href="/cookie-preferences">Cookie Preferences</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;