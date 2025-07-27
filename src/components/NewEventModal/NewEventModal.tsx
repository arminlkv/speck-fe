import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const NewEventModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: { name: string; start: string; end: string }) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name || !start || !end) {
      alert("Please fill all fields");
      return;
    }
    onCreate({ name, start, end });
    setName("");
    setStart("");
    setEnd("");
    onClose();
  };

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={9999}
      onClick={onClose}
    >
      <Box
        bg="black"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        width={{ base: "90%", sm: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Create New Event
        </Text>

        <Box mb={4}>
          <Text mb={1}>Name:</Text>
          <input
            style={{
              width: "100%",
              padding: 8,
              fontSize: 16,
              boxSizing: "border-box",
            }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event name"
          />
        </Box>

        <Box mb={4}>
          <Text mb={1}>Start Date & Time:</Text>
          <input
            style={{
              width: "100%",
              padding: 8,
              fontSize: 16,
              boxSizing: "border-box",
            }}
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </Box>

        <Box mb={4}>
          <Text mb={1}>End Date & Time:</Text>
          <input
            style={{
              width: "100%",
              padding: 8,
              fontSize: 16,
              boxSizing: "border-box",
            }}
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewEventModal;
