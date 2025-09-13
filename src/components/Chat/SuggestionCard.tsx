import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { SuggestionCard as SuggestionCardType } from '../../types';
import { useChatStore } from '../../store/ChatStore';

// Import the icons
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { AutoAwesome } from '@mui/icons-material';

const iconMap: { [key: string]: React.ElementType } = {
  SummarizeOutlined: SummarizeOutlinedIcon,
  DriveFileRenameOutlineOutlined: DriveFileRenameOutlineOutlinedIcon,
  ForumOutlined: ForumOutlinedIcon,
};

interface SuggestionCardProps {
  suggestion: SuggestionCardType;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  const { currentChatId, createNewChat, addMessage, setLoading } = useChatStore();
  const IconComponent = iconMap[suggestion.icon];

  const handleClick = async () => {
    let chatId = currentChatId;

    if (!chatId) {
      createNewChat();
      chatId = useChatStore.getState().currentChatId;
    }

    if (chatId) {
      addMessage(chatId, suggestion.title, 'user');
      setLoading(true);

      // Simulate AI response
      setTimeout(() => {
        addMessage(
          chatId!,
          "I'd be happy to help you with that! Let me provide you with a detailed response...",
          'assistant'
        );
        setLoading(false);
      }, 1500);
    }
  };

  return (
     <Card
     
      sx={{
        cursor: 'pointer',
        borderRadius: 3,
        p: 1,
        height: '100%',
        minHeight: 180,
        background: 'linear-gradient(135deg, #f8f0f9ff, #d5e3f2ff)',
        boxShadow: '0 2px 6px #0000000d',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 14px #00000014',
          '& .icon-container': {
            backgroundColor: '#1976d2',
          },
          '& .icon': {
            color: 'white',
          }
        },
      }}
      onClick={handleClick}
    >
 
      <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          className="icon-container"
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'rgba(25, 118, 210, 0.08)', // light blue circle
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            transition: 'background-color 0.2s ease-in-out',
                
          }}
        >
          <AutoAwesome className="icon" sx={{ fontSize: '1.2rem', color: '#1976d2', transition: 'color 0.2s ease-in-out' }} />
        </Box>

        <Typography
          variant="body1"
          fontWeight="500"
          sx={{
            lineHeight: 1.4,
            fontSize: '0.9rem', 
            color: 'text.primary',
            marginTop: 'auto',
          }}
        >
          {suggestion.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;