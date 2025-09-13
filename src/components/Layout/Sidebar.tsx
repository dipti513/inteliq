import React, { useState } from "react";
import {Box, IconButton, Button, Tooltip, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, InputBase, Paper, Avatar, Drawer,} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

// Icons
import SearchIcon from "@mui/icons-material/Search";
import TextsmsIcon from '@mui/icons-material/Textsms';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useChatStore } from '../../store/ChatStore';



export const SIDEBAR_WIDTH = 336;
export const SIDEBAR_COLLAPSED = 101;

// Styled component for the search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.background.default, // White on hover
  },
  margin: theme.spacing(1, 0, 1, 0),
  width: '100%',
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

interface SidebarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ isMobile, mobileOpen, handleDrawerToggle }) => {
  const {
    sidebarOpen,
    toggleSidebar,
    chats,
    currentChatId,
    selectChat
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);

  // Navigation items configuration
  const navItems = [
    { text: 'Home', icon: <TextsmsIcon />, onClick: () => selectChat(null), active: currentChatId === null, shortcut: '⌘H' },
    { text: 'Library', icon: <FolderOpenIcon />, onClick: () => {}, active: false, shortcut: '⌘T' },
    { text: 'History', icon: <WatchLaterIcon />, onClick: () => {}, active: false, shortcut: '⌘G' },
    { text: 'Explore', icon: sidebarOpen ? <PublicRoundedIcon /> : <FavoriteRoundedIcon />, onClick: () => {}, active: false, shortcut: '⌘L' },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SidebarContent = (
    <Box
      sx={{
        width: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
        flexShrink: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        position: "relative",
        p: '16px',
        transition: "width 0.3s ease",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: sidebarOpen ? "space-between" : "center",
          alignItems: "center",
          mb: 1,
        }}
      >
        {sidebarOpen && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
                bgcolor: '#4361ee',
                borderRadius: '2px',
                p: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <SettingsSuggestIcon sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Inteliq
            </Typography>
          </Box>
        )}
        <Tooltip title={sidebarOpen ? "Collapse" : "Expand"}>
          <IconButton onClick={toggleSidebar}>
            {sidebarOpen ? <ChevronLeftIcon /> : <SettingsSuggestIcon sx={{ color: '#4361ee' }} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Search */}
      {sidebarOpen && (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search for chats..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                 sx={{
                  fontSize: '0.85rem',
                  py: 0.5,
                  height: 32,
                }}
            />
        </Search>
      )}

      {/* Navigation */}
      <List sx={{ p: 0, mb: 1 }}>
        {navItems.map((item) => (
             <ListItem key={item.text} disablePadding sx={{ mb: 0.1 }}>
                <ListItemButton
                  onClick={item.onClick}
                  sx={{
                    borderRadius: '8px',
                    minHeight: 44,
                    transition: 'background-color 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'background.default',
                    },
                    ...(item.active && {
                      bgcolor: 'background.default',
                      color: '#4361ee',
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      fontSize: '1.2rem',
                      ...(item.active && { color: '#4361ee' }),
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {sidebarOpen && (
                    <>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                      />
                      <Box sx={{
                        bgcolor: 'action.hover',
                        py: 0.25,
                        px: 0.75,
                        borderRadius: 1,
                      }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {item.shortcut}
                        </Typography>
                      </Box>
                    </>
                  )}
                </ListItemButton>
            </ListItem>
        ))}
      </List>
      
      {/* Recent Chats */}
      {sidebarOpen && (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary" }}
          >
            Recent Chats
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            <List dense>
              {filteredChats.map((chat) => (
                <ListItem 
                  key={chat.id} 
                  disablePadding
                  onMouseEnter={() => setHoveredChatId(chat.id)}
                  onMouseLeave={() => setHoveredChatId(null)}
                  secondaryAction={
                    hoveredChatId === chat.id ? (
                      <IconButton edge="end" size="small">
                        <MoreHorizIcon />
                      </IconButton>
                    ) : null
                  }
                >
                  <ListItemButton
                    sx={{ borderRadius: '8px', pr: 5 }}
                    selected={currentChatId === chat.id}
                    onClick={() => selectChat(chat.id)}
                  >
                    <ListItemText
                      primary={chat.title}
                      primaryTypographyProps={{ noWrap: true, sx: { fontSize: "0.875rem" } }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Button size="small" sx={{ alignSelf: 'flex-start', textTransform: 'none', color: 'primary.main', mt: 1 }}>
            View All →
          </Button>
        </Box>
      )}
      
      {/* Spacer for collapsed view */}
      {!sidebarOpen && <Box sx={{ flexGrow: 1 }} />}

      {/* Footer */}
      <Box sx={{ mt: 2 }}>
        {sidebarOpen ? (
            <Paper
                elevation={0}
                sx={{
                    px: 1.5,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '12px',
                    background: 'linear-gradient(to right, #efdef1ff, #b6cfe7ff)',
                    color: 'black',
                    mb: 1,
                    cursor: 'pointer'
                }}
            >
                <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Try Pro!</Typography>
                    <Typography variant="caption">Upgrade for smarter AI and more...</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <RocketLaunchOutlinedIcon sx={{ color: '#4f8aa5ff' }} />
            </Paper>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Tooltip title="Try Pro!">
              <Box
                sx={{
                  background:'linear-gradient(to right, #efdef1ff, #b6cfe7ff)',
                  borderRadius: '8px', 
                  p: 1, 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px', 
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '0.65rem', 
                  fontWeight: 'bold',
                }}
              >
                Try Pro!
              </Box>
            </Tooltip>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: sidebarOpen ? "flex-start" : "center",
            ...(sidebarOpen && {
              px: 1,
              py: 0.5,
              borderRadius: '8px',
              bgcolor: 'action.hover'
            })
          }}
        >
          <Avatar sx={{ width: 28, height: 28 }}>
            <AccountCircleRoundedIcon />
          </Avatar>
          {sidebarOpen && (
            <>
              <Typography sx={{ ml: '12px', fontWeight: "medium" }}>
                Lawrence Cruz
              </Typography>
              <IconButton sx={{ ml: "auto" }}>
                <UnfoldMoreIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDEBAR_WIDTH },
          }}
        >
          {SidebarContent}
        </Drawer>
      ) : (
        SidebarContent
      )}
    </>
  );
};

export default Sidebar;
