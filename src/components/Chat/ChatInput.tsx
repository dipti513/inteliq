import { useState, useEffect, useRef } from 'react';
import {Box, TextField, IconButton, Paper, CircularProgress, Typography, Popover, List,
  ListItem, ListItemText, ListItemIcon, Button, Divider,
} from '@mui/material';
import {
  Send, AttachFile, PhotoCamera, DeleteOutline, Remove,
} from '@mui/icons-material';
import { useChatStore } from '../../store/ChatStore';

const MAX_LENGTH = 1000;

const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    currentChatId, isLoading, createNewChat, addMessage, setLoading,
  } = useChatStore();

  const handleAttachmentClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleAttachmentClose = () => setAnchorEl(null);
  const handleFiles = (newFiles: FileList | File[]) => setAttachedFiles((prev) => [...prev, ...Array.from(newFiles)]);
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.files && handleFiles(e.target.files);
  const handleAddClick = () => fileInputRef.current?.click();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleRemoveFile = (file: File) => setAttachedFiles((prev) => prev.filter(f => f !== file));
  const handleRemoveAllFiles = () => setAttachedFiles([]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => { if (anchorEl && e.clipboardData?.files) handleFiles(e.clipboardData.files); };
    if (anchorEl) document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [anchorEl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputValue.trim() && attachedFiles.length === 0) || isLoading) return;
    let chatId = currentChatId;
    if (!chatId) {
      createNewChat();
      chatId = useChatStore.getState().currentChatId;
    }
    if (chatId) {
      addMessage(chatId, inputValue.trim(), 'user');
      setInputValue('');
      setAttachedFiles([]);
      setLoading(true);
      setTimeout(() => {
        addMessage(chatId!, "Thank you for your message! How can I assist you further?", 'assistant');
        setLoading(false);
      }, 1500);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'attachment-popover' : undefined;
  const canSubmit = (inputValue.trim().length > 0 || attachedFiles.length > 0) && !isLoading;

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <input type="file" multiple ref={fileInputRef} onChange={handleFileInputChange} style={{ display: 'none' }} />
      <Paper
        elevation={0}
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: '8px 16px', display: 'flex', flexDirection: 'column', borderRadius: 3, border: '1px solid', borderColor: 'grey.200', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
      >
        <TextField
          fullWidth multiline minRows={1} maxRows={6}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me a question..."
          variant="standard"
          InputProps={{ disableUnderline: true, sx: { fontSize: '1rem', py: 1 } }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleAttachmentClick} aria-describedby={id}><AttachFile /></IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary', mx: 0.5 }}><PhotoCamera /></IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', mr: 2 }}>{inputValue.length}/{MAX_LENGTH}</Typography>
          <IconButton
            sx={{
              bgcolor: canSubmit ? 'primary.main' : 'grey.200',
              color: canSubmit ? 'white' : 'grey.500',
              '&:hover': { bgcolor: canSubmit ? 'primary.dark' : 'grey.300' },
            }}
            onClick={(e) => handleSubmit(e as any)}
            disabled={!canSubmit}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : <Send sx={{ fontSize: 18 }} />}
          </IconButton>
        </Box>
      </Paper>

      <Popover
        id={id} open={open} anchorEl={anchorEl} onClose={handleAttachmentClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: '-8px' } } }}
      >
        <Box sx={{ p: 2, width: 320 }} onDrop={handleDrop} onDragOver={handleDragOver}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="body1" fontWeight={500}>Attached Files</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" onClick={handleRemoveAllFiles} disabled={attachedFiles.length === 0}><DeleteOutline /></IconButton>
              <Button size="small" variant="outlined" onClick={handleAddClick} sx={{ textTransform: 'none', fontWeight: 500 }}>Add +</Button>
            </Box>
          </Box>
          <Divider sx={{ mb: 1.5 }} />
          {attachedFiles.length > 0 ? (
            <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
              {attachedFiles.map((file, index) => (
                <ListItem key={`${file.name}-${index}`} disablePadding secondaryAction={<IconButton edge="end" size="small" onClick={() => handleRemoveFile(file)}><Remove sx={{ fontSize: 18 }}/></IconButton>}>
                  <ListItemIcon sx={{ minWidth: 36 }}><AttachFile sx={{ fontSize: 20, color: 'text.secondary' }} /></ListItemIcon>
                  <ListItemText primary={<Typography variant="body2" noWrap sx={{ maxWidth: 180 }}>{file.name}</Typography>} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ minHeight: 100, border: '2px dashed', borderColor: 'grey.300', borderRadius: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'text.secondary', backgroundColor: 'grey.50' }}>
              <Typography variant="caption">Drag & drop files here or paste from clipboard.</Typography>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default ChatInput;