import { Box, Typography } from '@mui/material';
import SuggestionCard from './SuggestionCard';
import { useChatStore } from '../../store/ChatStore';

const ChatWelcome: React.FC = () => {
  const { getSuggestions } = useChatStore();
  const suggestions = getSuggestions();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Box sx={{ mb: 4, width: '100%', maxWidth: 800, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h4"
          component="h3"
          fontWeight="600"
          sx={{ 
            mb: 0,
            fontSize: { xs: '1.25rem', sm: '1.50rem' },
            textAlign: 'left',
          }}
        >
          👋🏻 Hi Laurence!
        </Typography>
        
        <Typography
          variant="h5"
          component="h1"
          fontWeight="300"
          color="text.primary"
          sx={{
            fontSize: { xs: '3.00rem', sm: '3.00rem' },
            textAlign: 'left',
          }}
        >
            What do you want to learn today?
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          maxWidth: 800,
          width: '100%',
          px: { xs: 2, sm: 3 }
        }}
      >
        {/* since there was issues with grid, insted used flexbox */}
        {suggestions.map((suggestion) => (
          <Box 
            key={suggestion.id}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 16px)',
                md: '1 1 calc(33.333% - 16px)'
              },
              minWidth: {
                xs: '100%',
                sm: 200
              }
            }}
          >
            <SuggestionCard suggestion={suggestion} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatWelcome;
