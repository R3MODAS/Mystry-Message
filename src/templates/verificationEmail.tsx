import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
    Container
} from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

const VerificationEmail = ({ username, otp }: VerificationEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Mystry Message - Verify Your Account</title>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
                        format: "woff2"
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>
                Welcome to Mystry Message! Here&apos;s your verification code:{" "}
                {otp.toString()}
            </Preview>
            <Container style={container}>
                <Section style={main}>
                    <Row>
                        <Text style={logo}>Mystry Message</Text>
                    </Row>
                    <Row>
                        <Heading as="h1" style={header}>
                            Welcome to the Mystery
                        </Heading>
                    </Row>
                    <Row>
                        <Text style={greeting}>Hello {username},</Text>
                    </Row>
                    <Row>
                        <Text style={paragraph}>
                            You&apos;re about to join the world of mysterious
                            conversations! To complete your journey, please use
                            this verification code:
                        </Text>
                    </Row>
                    <Row>
                        <Text style={code}>
                            {otp.toString().split("").join(" ")}
                        </Text>
                    </Row>
                    <Row>
                        <Button
                            href={`http://localhost:3000/verify/${username}`}
                            style={button}
                        >
                            Unlock Your Account
                        </Button>
                    </Row>
                    <Row>
                        <Text style={footer}>
                            This message will self-destruct in 10 minutes. Just
                            kidding! But seriously, if you didn&apos;t request
                            this code, please ignore this email or contact our
                            support team.
                        </Text>
                    </Row>
                    <Row>
                        <Text style={signature}>
                            Mysteriously yours,
                            <br />
                            The Mystery Message Team
                        </Text>
                    </Row>
                    <Row>
                        <Text style={disclaimer}>
                            This email was sent by Mystry Message - where every
                            message holds a secret.
                        </Text>
                    </Row>
                </Section>
            </Container>
        </Html>
    );
};

// Styles
const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "580px"
};

const main = {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "40px 32px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    color: "#ffffff"
};

const logo = {
    fontSize: "28px",
    fontWeight: "600",
    color: "#7c3aed",
    textAlign: "center" as const,
    padding: "0 0 24px",
    fontFamily: "Inter, Arial, sans-serif"
};

const header = {
    fontSize: "24px",
    lineHeight: "24px",
    fontWeight: "600",
    color: "#ffffff",
    padding: "0 0 12px",
    textAlign: "center" as const
};

const greeting = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#ffffff",
    fontWeight: "500",
    padding: "0 0 20px"
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#e5e5e5"
};

const code = {
    display: "block",
    padding: "24px",
    margin: "24px 0",
    backgroundColor: "#2d2d2d",
    borderRadius: "4px",
    fontSize: "32px",
    fontWeight: "600",
    letterSpacing: "8px",
    textAlign: "center" as const,
    color: "#7c3aed",
    border: "1px solid #7c3aed"
};

const button = {
    backgroundColor: "#7c3aed",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "500",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 24px",
    margin: "24px 0",
    border: "none"
};

const footer = {
    fontSize: "14px",
    lineHeight: "24px",
    color: "#a3a3a3",
    fontStyle: "italic"
};

const signature = {
    fontSize: "14px",
    lineHeight: "24px",
    color: "#e5e5e5",
    marginTop: "32px"
};

const disclaimer = {
    fontSize: "12px",
    lineHeight: "20px",
    color: "#666666",
    textAlign: "center" as const,
    marginTop: "32px",
    borderTop: "1px solid #333333",
    paddingTop: "24px"
};

export default VerificationEmail;
