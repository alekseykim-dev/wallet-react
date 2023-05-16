import React from "react";
import "../../../css/help.css";
import { TabContext } from "@mui/lab";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function HelpPage() {
  /* INITIALIZATION */
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      num: "1.",
      question: "What is a crypto wallet?",
      answer:
        "Thinking about buying crypto or NFTs? You’ll need a crypto wallet. When you create a wallet, two keys are generated: a private and a public key. The wallet stores your keys and allows you to sign transactions, generate new addresses, initiate transfers, track portfolio balances, manage your crypto, and interact with dApps. Crypto wallets come in many forms, from hardware wallets like Ledger to mobile apps that you can download on your phone or tablet.",
    },
    {
      num: "2.",
      question: "How do crypto wallets work?",
      answer:
        "When you buy crypto like Bitcoin and Ethereum, you’re issued with two keys: the public and private keys. The public key can be compared to a bank account number that you can share with third parties to receive crypto without worrying that your assets will be compromised. The private key signs transactions and allows you to send and receive crypto. It's crucial to keep your private keys secure and secret. If anyone has access to them, they will also have access to any crypto assets associated with those keys. A crypto wallet stores your private keys and gives you access to your assets.",
    },
    {
      num: "3.",
      question: "What are the different types of crypto wallets?",
      answer:
        "There are different types of crypto wallets, each with its own benefits and drawbacks. Hot wallets are connected to the internet and usually convenient to use, however, they are also vulnerable to online attacks. Examples include web-based, mobile, and desktop wallets. With cold wallets, your private keys are stored offline and out of reach of online threats. Examples include paper and hardware wallets. Wallets can also be categorized as custodial or non-custodial, depending on who holds the private keys. Storing your crypto in a custodial wallet means that a third party controls your private keys and, therefore, your assets. In contrast, a non-custodial wallet allows you to fully own and control your crypto.",
    },
    {
      num: "4.",
      question: "Why do I need a hardware wallet?",
      answer:
        "Hot wallets store private keys on systems connected to the internet, which makes them susceptible to online attacks. Keeping your crypto on an exchange means you have no true ownership or control over it. If the exchange files for bankruptcy or pauses withdrawals, you lose access to your funds. Hardware wallets store your private keys offline, giving you full control and enhanced security. Even if you misplace or lose your hardware wallet, you can get a new one and use your Secret Recovery Phrase to access your assets.",
    },
    {
      num: "5.",
      question: "How to get a crypto wallet?",
      answer:
        "Ready to get started? Here are the steps for getting your crypto wallet: Get a hardware wallet. It stores your private keys in a secure, offline environment giving you peace of mind and complete control over your assets. All wallets are powered by an industry-leading Secure Element chip, together with's proprietary OS that protects your crypto & NFTs from sophisticated hacks. Pair your wallet with the Live app to easily send, receive and grow crypto, keep track of your portfolio, and securely access a range of dApps and Web3 services. All in one place. Add crypto to your wallet. Wallets have partnered with leading third-party providers so that you can securely buy, swap, and grow your crypto through the Live app. Your crypto will be sent to the safety of your hardware wallet.",
    },
    {
      num: "6.",
      question:
        "Is it possible to restore all cryptocurrencies with a hardware wallet backup?",
      answer:
        "Most wallets support more than just one cryptocurrency, but only generate one backup. Nevertheless, this one backup is sufficient to restore all cryptocurrencies as all private keys of the different wallets result from the seed that is backed up as a backup during setup.",
    },
    {
      num: "7.",
      question:
        "Are there any warranties or guarantees for the cold wallets purchased?",
      answer:
        "Yes, we offer warranties or guarantees for the cold wallets purchased from our website. The specific warranty details, including the duration and coverage, may vary depending on the manufacturer and the particular cold wallet model. We recommend reviewing the product description or contacting our customer support for more information about the warranty or guarantee associated with your chosen cold wallet.",
    },
    {
      num: "8.",
      question: "Are cold wallets safer than online wallets?",
      answer:
        "Yes, cold wallets are generally considered safer than online wallets. By keeping the private keys offline, cold wallets protect against remote hacking attempts and malware attacks that often target online wallets. This offline storage significantly reduces the risk of unauthorized access to your funds.",
    },
    {
      num: "9.",
      question: "Can I lose my funds if I lose my crypto cold wallet?",
      answer:
        "No, you won't lose your funds if you lose your cold wallet. Most cold wallets have a recovery process using a recovery phrase or seed phrase. This phrase allows you to restore your wallet on a new device or replacement hardware wallet. It's crucial to keep your recovery phrase in a secure and separate location from your cold wallet.",
    },
    {
      num: "10.",
      question: "Can I store multiple cryptocurrencies in a cold wallet?",
      answer:
        "Yes, most cold wallets support multiple cryptocurrencies. However, the specific cryptocurrencies supported may vary depending on the wallet manufacturer and the wallet's software. It's essential to check the wallet's compatibility with the cryptocurrencies you intend to store.",
    },
    {
      num: "11.",
      question: "How can I ensure the authenticity of a crypto cold wallet?",
      answer:
        "To ensure authenticity, it's crucial to purchase your cold wallet directly from the manufacturer or authorized resellers. Be cautious of third-party sellers or resellers on online marketplaces, as they may sell counterfeit or tampered devices. Always verify the security features and packaging before using a newly purchased cold wallet.",
    },
    {
      num: "12.",
      question: "Can I use a cold wallet with a mobile device?",
      answer:
        "Yes, many cold wallets offer compatibility with mobile devices. They often provide companion apps for smartphones, allowing you to manage and monitor your funds conveniently. However, it's important to ensure that the mobile device itself is secure and free from malware or unauthorized access.",
    },
    {
      num: "13.",
      question: "Can I use a crypto cold wallet for everyday transactions?",
      answer:
        "While crypto cold wallets are primarily designed for long-term storage and security, they may not be as convenient for frequent or everyday transactions. Cold wallets require a connection to an online device to broadcast transactions, which can be a bit more time-consuming compared to using a hot wallet or online wallet. However, some cold wallets offer limited functionality for quick transactions while still maintaining the overall security of your funds.",
    },
    {
      num: "14.",
      question:
        "What if my crypto cold wallet becomes obsolete or unsupported?",
      answer:
        "Technology evolves rapidly, and it's possible for a cold wallet to become outdated or unsupported in the future. In such cases, it's important to stay informed about firmware updates and compatibility with newer operating systems. If your cold wallet becomes obsolete, you may need to transfer your funds to a newer, supported wallet. Keeping up with the latest developments in the crypto industry and regularly checking for updates from the wallet manufacturer will help you stay prepared.",
    },
    {
      num: "15.",
      question:
        "Can I inherit or pass on my crypto cold wallet to someone else?",
      answer:
        "Yes, you can pass on or inherit a crypto cold wallet. However, it's essential to educate your intended recipient about how to use and secure the wallet properly. It's recommended to transfer the ownership of the cold wallet along with clear instructions, including the recovery phrase, PIN codes, and any other necessary information. By doing so, you can ensure a smooth transition of ownership without the risk of losing access to the funds stored in the wallet.",
    },
  ];

  const rules = [
    `Welcome to Bitsafe! These rules govern your use of our website and the purchase of cold wallet products and related services from our website. By accessing or using our website and purchasing Products, you agree to be bound by these Rules`,
    `1. Product Information and Availability`,

    `1.1 We strive to provide accurate and up-to-date information about our Products, including descriptions, specifications, and pricing. However, we do not guarantee the accuracy, completeness, or availability of the information on our website. We reserve the right to modify or discontinue any Product without prior notice.`,
    `1.2 The availability of Products may vary and is subject to change. We cannot guarantee the availability of any specific Product or guarantee that a Product will be in stock at the time of your purchase.`,

    `Ordering and Payment.`,
    `2.1 By placing an order on our website, you agree to provide accurate and complete information required for the purchase. You are responsible for ensuring that the information provided is correct and up to date.`,
    `2.2 All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason at our discretion. In such cases, we will provide a refund for any payment received.`,
    `2.3 Payment for Products must be made in full at the time of purchase, unless otherwise specified. We accept payment through the methods specified on our website. All payments are subject to the terms and conditions of the respective payment processors.`,
    `3. Shipping and Delivery`,
    `3.1 We will make reasonable efforts to process and ship your order in a timely manner. However, we cannot guarantee specific delivery times and are not liable for any delays caused by shipping carriers or other factors beyond our control.`,
    `3.2 Shipping costs and delivery options will be displayed during the checkout process. You are responsible for providing accurate shipping information, and any additional costs or charges incurred due to incorrect or incomplete information will be your responsibility.`,
    `4. Returns and Refunds.`,
    `4.1 We strive to provide high-quality Products, but if you are not satisfied with your purchase, you may be eligible for a return or refund in accordance with our Return and Refund Policy, which is available on our website.`,
    `4.2 Please review our Return and Refund Policy carefully for information on eligibility, procedures, and any applicable fees or restrictions.`,
    `5. Intellectual Property`,
    `5.1 All intellectual property rights related to our website and the content displayed on it, including trademarks, logos, and copyrights, belong to Bitsafe or their respective owners. You may not use our intellectual property without our prior written consent.`,
    `6. Privacy.`,
    `6.1 We collect and process personal information in accordance with our Privacy Policy, which is available on our website. By using our website and purchasing Products, you consent to the collection, storage, and use of your personal information as described in our Privacy Policy.`,
    `7. Governing Law and Jurisdiction`,
    `7.1 These Rules shall be governed by and construed in accordance with the laws of South Korea. Any disputes arising out of or in connection with these Rules shall be subject to the exclusive jurisdiction of the courts of South Korea.`,
  ];

  /* HANDLES */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help_page">
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className="help_menu">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Tab label="FAQ" value={"1"} />
                <Tab label="Rules" value={"2"} />
                <Tab label="Send an email" value={"3"} />
              </TabList>
            </Box>
          </Box>

          <Stack>
            <Stack className="help_main_content">
              <TabPanel value="2">
                <Stack className="theRules_box">
                  <Box className="theRulesFrame">
                    {rules.map((ele) => {
                      return <p>{ele}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>

              <TabPanel value="1">
                <Stack className="accordion_menu">
                  {faq.map((ele, index) => {
                    return (
                      <Accordion style={{margin: "0px"}} className="accordion" key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panelia-content"
                          id="panella-header"
                        >
                          <Typography>{ele.num} {ele.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{ele.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>

              <TabPanel value="3">
                <Stack className="admin_letter_box">
                  <Stack className="admin_letter_container">
                    <Box className="admin_letter_frame">
                      <span>Send an email to ADMIN</span>
                      <p>
                        You can fill out the fields and let the admin know your
                        thoughts{" "}
                      </p>
                    </Box>
                    <form
                      action="#"
                      method="POST"
                      className="admin_letter_frame"
                    >
                      <div className="admin_input_box">
                        <label>Name</label>
                        <input type="text" name="mb_nick" placeholder="Write your name" />
                      </div>
                      <div className="admin_input_box">
                        <label>E-mail address</label>
                        <input
                          type="text"
                          name="mb_email"
                          placeholder="Write your e-mail address"
                        />
                      </div>
                      <div className="admin_input_box">
                        <label>Message</label>
                        <textarea name="mb_msg" placeholder="Write your message here"></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent="flex-end"
                        sx={{ mt: "30px" }}
                      >
                        <Button type="submit" variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
      ;
    </div>
  );
}