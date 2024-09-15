import React, { useState } from "react";
import { Button, Card, H4, HTMLSelect, TextArea } from "@blueprintjs/core";
import "./LoremIpsumGenerator.css";
import Header from "../common/Header";
import CopyButton from "../common/CopyButton";

interface LoremIpsumGeneratorProps {
  vscode: any;
}

const LOREM_IPSUM_TEXT = {
  paragraph: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
    "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
    "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
    "Nulla quis lorem ut libero malesuada feugiat.",
    "Donec sollicitudin molestie malesuada.",
    "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
    "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    "Curabitur aliquet quam id dui posuere blandit.",
    "Pellentesque in ipsum id orci porta dapibus.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "Proin eget tortor risus.",
    "Donec sollicitudin molestie malesuada.",
    "Nulla porttitor accumsan tincidunt.",
    "Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
    "Donec rutrum congue leo eget malesuada.",
    "Vivamus suscipit tortor eget felis porttitor volutpat.",
    "Nulla porttitor accumsan tincidunt.",
    "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
    "Sed porttitor lectus nibh.",
    "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
  ],
  sentence: [
    "Lorem ipsum dolor sit amet.",
    "Consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore.",
    "Ut enim ad minim veniam.",
    "Duis aute irure dolor in reprehenderit.",
    "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    "Donec sollicitudin molestie malesuada.",
    "Cras ultricies ligula sed magna dictum porta.",
    "Curabitur aliquet quam id dui posuere blandit.",
    "Mauris blandit aliquet elit, eget tincidunt.",
  ],
  word: [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "minim",
  ],
  title: [
    "Mr.",
    "Mrs.",
    "Dr.",
    "Prof.",
    "Miss",
    "Sir",
    "Madam",
    "Lord",
    "Lady",
    "Rev.",
  ],
  firstName: [
    "John",
    "Jane",
    "Alex",
    "Emily",
    "Chris",
    "Lisa",
    "James",
    "Emma",
    "Michael",
    "Sophia",
  ],
  lastName: [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Williams",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Martinez",
  ],
  email: [
    "example@mail.com",
    "user@mail.com",
    "contact@mail.com",
    "info@website.com",
    "support@service.com",
    "test@domain.com",
    "feedback@service.com",
    "customer@website.com",
    "admin@site.com",
    "help@domain.com",
  ],
  url: [
    "https://example.com",
    "https://mysite.com",
    "https://yourdomain.com",
    "https://webpage.com",
    "https://testsite.com",
    "https://blog.com",
    "https://store.com",
    "https://service.com",
    "https://app.com",
    "https://platform.com",
  ],
  shortTweet: [
    "Just finished a great book!",
    "Loving this new tech release.",
    "Anyone have recommendations for movies?",
    "Excited for the weekend!",
    "Had an amazing dinner last night.",
    "The sunset was beautiful today.",
    "Can't wait for the new season to drop.",
    "Starting a new project today.",
    "Working on something cool.",
    "Looking forward to the next adventure!",
  ],
  longTweet: [
    "It's been a really long day and I'm just sitting here reflecting on everything. Sometimes life can get overwhelming but it's important to take a break and breathe.",
    "I'm thinking about the current state of tech. With so many advancements happening daily, it's hard to keep up! What are your thoughts on the recent AI innovations?",
    "Had an amazing day exploring the city! The architecture, food, and people made it unforgettable. I highly recommend checking out the local art galleries.",
    "Just finished reading an incredible book that has changed my perspective on productivity and life in general. If you're looking for inspiration, this is the book for you!",
    "Spent the weekend hiking in the mountains. The views were breathtaking, and it was exactly the escape I needed from the daily grind.",
    "Just started learning a new programming language. It feels challenging, but the excitement of building something new is totally worth it.",
    "Attended a fantastic tech conference today. Met some really talented people and learned a lot about the future of web development.",
    "Enjoying the simple things in life today: a cup of coffee, good music, and the company of great friends. Sometimes, that's all you need.",
    "Reflecting on how much has changed over the past few years. Life is full of surprises, and I'm grateful for the journey so far.",
    "Started a new fitness routine this morning, and I already feel more energized. Looking forward to seeing the progress over the next few weeks!",
  ],
};

const LoremIpsumGenerator: React.FC<LoremIpsumGeneratorProps> = ({
  vscode,
}) => {
  const [selection, setSelection] = useState<string>("paragraph");
  const [generatedText, setGeneratedText] = useState<string>("");

  // Function to get random text from an array
  const getRandomText = (array: string[], count: number = 1) => {
    const randomText = [];
    for (let i = 0; i < count; i++) {
      randomText.push(array[Math.floor(Math.random() * array.length)]);
    }
    return randomText.join(" ");
  };

  // Function to generate bigger paragraphs
  const generateBigParagraph = () => {
    // Generate a larger paragraph by combining multiple random sentences
    return getRandomText(LOREM_IPSUM_TEXT.sentence, 15); // Combines 15 random sentences
  };

  // Function to generate the Lorem Ipsum content based on selection
  const generateLoremIpsum = (option: string) => {
    if (option === "fullName") {
      const firstName = getRandomText(LOREM_IPSUM_TEXT.firstName);
      const lastName = getRandomText(LOREM_IPSUM_TEXT.lastName);
      setGeneratedText(`${firstName} ${lastName}`);
    } else if (option === "paragraph") {
      // For larger paragraphs, combine multiple smaller ones or sentences
      setGeneratedText(generateBigParagraph());
    } else {
      const textArray =
        LOREM_IPSUM_TEXT[option as keyof typeof LOREM_IPSUM_TEXT];
      const randomText = getRandomText(textArray);
      setGeneratedText(randomText);
    }
  };

  const handleGenerate = () => {
    generateLoremIpsum(selection);
  };

  const handleClear = () => {
    setGeneratedText("");
    setSelection("paragraph");
  };

  return (
    <div className="holder">
      <Header title="Lorem Ipsum Generator" />
      <Card className="input-card">
        <H4>Select Content Type</H4>
        <HTMLSelect
          options={[
            { label: "Paragraph", value: "paragraph" },
            { label: "Sentence", value: "sentence" },
            { label: "Word", value: "word" },
            { label: "Title", value: "title" },
            { label: "First Name", value: "firstName" },
            { label: "Last Name", value: "lastName" },
            { label: "Full Name", value: "fullName" },
            { label: "Email", value: "email" },
            { label: "URL", value: "url" },
            { label: "Short Tweet", value: "shortTweet" },
            { label: "Long Tweet", value: "longTweet" },
          ]}
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
        />

        <div>
          <Button
            intent="primary"
            onClick={handleGenerate}
            style={{ marginRight: "10px" }}
          >
            Generate
          </Button>
          <Button intent="danger" onClick={handleClear}>
            Clear
          </Button>
          <CopyButton vscode={vscode} text={generatedText} label="Copy Text" />
        </div>

        {generatedText && (
          <>
            <H4>Generated Text</H4>
            <TextArea
              autoResize={true}
              fill={true}
              large={true}
              readOnly={true}
              value={generatedText}
            />
          </>
        )}
      </Card>

      <Card className="example-card">
        <H4>How to Use the Lorem Ipsum Generator</H4>
        <p>To generate Lorem Ipsum text, follow these steps:</p>
        <ol>
          <li>
            Select the type of content you need from the dropdown menu. Options
            include paragraphs, sentences, words, titles, names, emails, URLs,
            and tweets.
          </li>
          <li>
            Click the "Generate" button to create the text based on your
            selection.
          </li>
          <li>
            The generated text will appear in the text area below. You can copy
            it to your clipboard using the "Copy Text" button.
          </li>
          <li>
            If you need a different type of content or want to start over, click
            the "Clear" button to reset the generator.
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default LoremIpsumGenerator;
