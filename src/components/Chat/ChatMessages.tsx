import { Box, Typography, Avatar, Paper } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import { Message } from '../../types';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2 }}>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
            alignItems: 'flex-start',
          }}
        >
          <Avatar
            sx={{
              bgcolor: message.role === 'user' ? 'primary.main' : 'grey.700',
              width: 32,
              height: 32,
            }}
          >
            {message.role === 'user' ? (
              <Person sx={{ fontSize: 18 }} />
            ) : (
              <SmartToy sx={{ fontSize: 18 }} />
            )}
          </Avatar>
          
          <Paper
            elevation={0}
            sx={{
              p: 2,
              maxWidth: '70%',
              bgcolor: message.role === 'user' ? 'grey.100' : 'background.paper',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
              }}
            >
              {message.content}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessages;
