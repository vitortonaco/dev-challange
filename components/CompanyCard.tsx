
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export type CompanyCardData = {
  company_name: string;
  service_line: string;
  company_description: string;
  tier1_keywords: string[];
  tier2_keywords: string[];
  emails: string[];
  poc: string;
};

function CompanyCard(props: CompanyCardData) {
  const [companyName, setCompanyName] = useState(props.company_name);
  const [serviceLine, setServiceLine] = useState(props.service_line);
  const [companyDescription, setCompanyDescription] = useState(props.company_description);
  const [tier1Keywords, setTier1Keywords] = useState<string[]>(props.tier1_keywords);
  const [tier2Keywords, setTier2Keywords] = useState<string[]>(props.tier2_keywords);
  const [emails, setEmails] = useState<string[]>(props.emails);
  const [poc, setPoc] = useState(props.poc);

  // Handlers for array fields
  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[], idx: number, value: string) => {
    const newArr = [...arr];
    newArr[idx] = value;
    setter(newArr);
  };
  const handleAddToArray = (setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[]) => {
    setter([...arr, '']);
  };
  const handleDeleteFromArray = (setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[], idx: number) => {
    const newArr = arr.filter((_, i) => i !== idx);
    setter(newArr);
  };

  return (
    <Card sx={{ minWidth: 300, maxWidth: 500, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          <TextField
            variant="standard"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            InputProps={{ disableUnderline: true, style: { fontSize: 24, fontWeight: 500 } }}
            fullWidth
          />
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          <TextField
            variant="standard"
            value={serviceLine}
            onChange={e => setServiceLine(e.target.value)}
            InputProps={{ disableUnderline: true, style: { color: 'rgba(0,0,0,0.6)' } }}
            fullWidth
          />
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <TextField
            variant="standard"
            value={companyDescription}
            onChange={e => setCompanyDescription(e.target.value)}
            InputProps={{ disableUnderline: true }}
            fullWidth
            multiline
          />
        </Typography>
        <Typography variant="subtitle2">Tier 1 Keywords:</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
          {tier1Keywords.map((kw, idx) => (
            <span key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <Chip label={kw} color="primary" size="small" sx={{ mr: 0.5 }} />
              <IconButton aria-label="edit" size="small" onClick={() => {}} style={{ padding: 2 }}>
                <TextField
                  value={kw}
                  onChange={e => handleArrayChange(setTier1Keywords, tier1Keywords, idx, e.target.value)}
                  size="small"
                  variant="standard"
                  InputProps={{ disableUnderline: false }}
                  sx={{ width: 70 }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDeleteFromArray(setTier1Keywords, tier1Keywords, idx)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          ))}
          <IconButton aria-label="add" onClick={() => handleAddToArray(setTier1Keywords, tier1Keywords)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Typography variant="subtitle2">Tier 2 Keywords:</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
          {tier2Keywords.map((kw, idx) => (
            <span key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <Chip label={kw} color="secondary" size="small" sx={{ mr: 0.5 }} />
              <IconButton aria-label="edit" size="small" onClick={() => {}} style={{ padding: 2 }}>
                <TextField
                  value={kw}
                  onChange={e => handleArrayChange(setTier2Keywords, tier2Keywords, idx, e.target.value)}
                  size="small"
                  variant="standard"
                  InputProps={{ disableUnderline: false }}
                  sx={{ width: 70 }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDeleteFromArray(setTier2Keywords, tier2Keywords, idx)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          ))}
          <IconButton aria-label="add" onClick={() => handleAddToArray(setTier2Keywords, tier2Keywords)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Typography variant="subtitle2">Emails:</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
          {emails.map((email, idx) => (
            <span key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <Chip label={email} variant="outlined" size="small" sx={{ mr: 0.5 }} />
              <IconButton aria-label="edit" size="small" onClick={() => {}} style={{ padding: 2 }}>
                <TextField
                  value={email}
                  onChange={e => handleArrayChange(setEmails, emails, idx, e.target.value)}
                  size="small"
                  variant="standard"
                  InputProps={{ disableUnderline: false }}
                  sx={{ width: 120 }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDeleteFromArray(setEmails, emails, idx)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          ))}
          <IconButton aria-label="add" onClick={() => handleAddToArray(setEmails, emails)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Typography variant="subtitle2">POC:</Typography>
        <Typography variant="body2">
          <TextField
            variant="standard"
            value={poc}
            onChange={e => setPoc(e.target.value)}
            InputProps={{ disableUnderline: true }}
            fullWidth
          />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CompanyCard;
