import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
  } from "@nextui-org/react";
  import { useState } from "react";
  import { CircleAlert } from "lucide-react";
  
  export default function RejectionModal({onReject , buttonName}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [rejectionReasons, setRejectionReasons] = useState([]);
    const [currentReason, setCurrentReason] = useState("");
  
    const handleAddReason = () => {
      if (currentReason.trim()) {
        setRejectionReasons((prevReasons) => [...prevReasons, currentReason.trim()]);
        setCurrentReason(""); 
      }
    };
  
    const handleKeyUp = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddReason();
      }
    };
  
    return (
      <>
        <Button
          color="primary"
          onPress={onOpen}
          className="border bg-red-500 text-white hover:bg-red-600"
        >
         {`${buttonName || "Reject Application "}`}
        </Button>
        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={onOpenChange}
          className="border bg-white rounded-lg shadow-xl"
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-center text-lg font-semibold text-red-500">
                  Rejection Details
                </ModalHeader>
                <ModalBody className="flex flex-col justify-center items-center space-y-4 p-6">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      endContent={<CircleAlert className="text-gray-400" />}
                      placeholder="Enter your reason for rejection"
                      variant="bordered"
                      className="flex-grow"
                      value={currentReason}
                      onChange={(e) => setCurrentReason(e.target.value)}
                      onKeyUp={handleKeyUp}
                    />
                    <Button
                      color="primary"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onPress={handleAddReason}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="w-full max-w-sm mt-4 space-y-2">
                    {rejectionReasons.length > 0 && (
                      <ul className="list-disc list-inside text-left text-gray-700">
                        {rejectionReasons.map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter className="flex justify-end gap-3 p-4">
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                    className="hover:bg-red-100"
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      console.log("Rejection reasons:", rejectionReasons);
                      onClose();
                        onReject(rejectionReasons)
                    }}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Reject
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  