import React from "react";
import {
  Button,
  Container,
  Input,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import QuilEditor from "@components/QuillEditor";

const MainScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [head, setHead] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleChange = (val: string) => {
    setValue(val);
  };

  return (
    <Container maxW="4xl" py={4} px={2}>
      <Heading mb={4}>에디터</Heading>
      <Tabs colorScheme="black">
        <TabList>
          <Tab>작성</Tab>
          <Tab>미리보기</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} py={2}>
            <Input
              value={head}
              onChange={(e) => setHead(e.target.value)}
              size="lg"
              placeholder="제목을 입력하세요."
              border="none"
              borderBottom={"1px solid #ccc !important"}
              rounded="none"
              mb={4}
            />
            <QuilEditor value={value} onChange={handleChange} />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>{value}</ModalBody>
              </ModalContent>
            </Modal>
            <Button
              mt={4}
              onClick={onOpen}
              bg="white"
              border={"1px solid #ccc"}
              rounded="none"
            >
              제출
            </Button>
          </TabPanel>
          <TabPanel p={0} py={4}>
            <Heading>{head}</Heading>
            <Divider my={4} />
            <Box className="ql-snow">
              <Box
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MainScreen;
