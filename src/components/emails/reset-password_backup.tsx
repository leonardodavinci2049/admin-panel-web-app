import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps {
  userEmail?: string;
  resetLink?: string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { userEmail = "example@gmail.com", resetLink = "https://example.com/reset-password" } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[32px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetLink}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Reset Password
              </Button>
            </Section>

            {/* Security Notice */}
            <Section className="bg-gray-50 p-[24px] rounded-[8px] mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px] font-semibold">
                🔒 Security Notice
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                • If you didn&#39;t request this password reset, please ignore this email
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                • This link will expire in 24 hours
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                • For security, never share this link with anyone
              </Text>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button doesn&#39;t work, copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                {resetLink}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] mb-[8px]">
                This email was sent by YourCompany Inc.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] mb-[8px] m-0">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © {new Date().getFullYear()} YourCompany Inc. All rights reserved. | 
                <a href="#" className="text-blue-600 no-underline ml-[4px]">Unsubscribe</a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ForgotPasswordEmail.PreviewProps = {
  userEmail: "example@gmail.com",
  resetLink: "https://example.com/reset-password?token=abc123xyz789",
};

export default ForgotPasswordEmail;