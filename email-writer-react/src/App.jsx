import { useState } from 'react';
import './App.css';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

   const handleSubmit = async () => {  
    setLoading(true);
    setError('');
    setGeneratedReply('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });
      setGeneratedReply(typeof  response.data === 'string' ? response.data : JSON.stringify(response.data));

      if (response.status !== 200) {
        throw new Error('Failed to generate reply. Please try again.');
      }

    } catch (err) {
      setError('Failed to generate email reply. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          label="Original Email Content"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
          
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!emailContent.trim() || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>
      </Box>

      {error && (
        <Typography color='error' sx={{ mb: 2 }}>
          {error}
      </Typography>
      )}

      {generatedReply && (
        <Box sx={{ mt: 3}}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={generatedReply || ''}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigator.clipboard.writeText(generatedReply)}
            sx={{ mt: 2  }}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
