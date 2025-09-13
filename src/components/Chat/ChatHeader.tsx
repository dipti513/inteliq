import {Box, IconButton, Button, Toolbar, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import { Share, Help, Add} from '@mui/icons-material';

import { useChatStore } from '../../store/ChatStore';

interface ChatModel {
  model: string;
  setModel: (model: string) => void;
}

const ChatHeader: React.FC = () => {
  const { model, setModel, createNewChat } = useChatStore();

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    setModel(event.target.value);
  };

  return (
    <Box 
      component="header" 
      sx={{
        position: "static",
        backgroundColor: 'transparent',
        width: '100%'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{
          bgcolor: 'action.hover',
          borderRadius: '12px',
          p: '4px 12px',
        }}>
          <Select
            value={model}
            onChange={handleModelChange}
            variant="standard"
            disableUnderline
            sx={{ 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              '& .MuiSelect-icon': {
                color: 'text.secondary',
              }
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
              },
              slotProps: {
                paper: {
                  sx: {
                    borderRadius: '12px',
                    mt: 1
                  }
                }
              }
            }}
          >
            <MenuItem value="ChatGPT 4">ChatGPT 4</MenuItem>
            <MenuItem value="ChatGPT 3.5">ChatGPT 3.5</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            sx={{ color: 'text.secondary' }}
            aria-label="share"
          >
            <Share />
          </IconButton>
          
          <IconButton
            size="small"
            sx={{ color: 'text.secondary' }}
            aria-label="settings"
          >
            <Help />
          </IconButton>
          
          <Button
            variant="contained"
            onClick={createNewChat}
            sx={{ 
              ml: 2,
              borderRadius: '12px',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
           <Add/> New Chat
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default ChatHeader;