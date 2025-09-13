import { Box, Container } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatWelcome from './ChatWelcome';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChatStore } from '../../store/ChatStore';

const ChatArea: React.FC = () => {
  const { getCurrentChat } = useChatStore();
  const currentChat = getCurrentChat();

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.default',
      gap: '10px' 
    }}>
      <ChatHeader />  

      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Container 
          maxWidth="md" 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            pt: 1, 
            pb: 2, 
            px: { xs: 2, sm: 3 }
          }}
        >
          {!currentChat || currentChat.messages.length === 0 ? (
            <ChatWelcome />
          ) : (
            <ChatMessages messages={currentChat.messages} />
          )}
        </Container>
        
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 }, pb: 2 }}>
          <ChatInput />
        </Container>
      </Box>
    </Box>
  );
};

export default ChatArea;
