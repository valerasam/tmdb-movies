import Modal from 'react-modal'

const ModalWindow = ({ isOpen, setIsOpen, children }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${theme.borderGrey}`,
            borderRadius: '10px',
        },
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={setIsOpen}
            style={customStyles}
            contentLabel='Modal window'
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setIsOpen(false)}
        >
            {children}
        </Modal>
    )
}
export default ModalWindow
