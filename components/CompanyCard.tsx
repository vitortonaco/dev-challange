
import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { EditableChip } from './EditableChip'
import DeleteIcon from '@mui/icons-material/Delete'

export type CompanyCardData = {
  company_name: string
  service_line: string
  company_description: string
  tier1_keywords: string[]
  tier2_keywords: string[]
  emails: string[]
  poc: string
}

function CompanyCard(props: CompanyCardData) {
  const [companyName, setCompanyName] = useState(props.company_name)
  const [serviceLine, setServiceLine] = useState(props.service_line)
  const [companyDescription, setCompanyDescription] = useState(props.company_description)
  const [tier1Keywords, setTier1Keywords] = useState<string[]>(props.tier1_keywords)
  const [tier2Keywords, setTier2Keywords] = useState<string[]>(props.tier2_keywords)
  const [emails, setEmails] = useState<string[]>(props.emails)
  const [poc, setPoc] = useState(props.poc)

  // Handlers for array fields
  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[], idx: number, value: string) => {
    const newArr = [...arr]
    newArr[idx] = value
    setter(newArr)
  }
  const handleAddToArray = (setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[]) => {
    setter([...arr, ''])
  }
  const handleDeleteFromArray = (setter: React.Dispatch<React.SetStateAction<string[]>>, arr: string[], idx: number) => {
    const newArr = arr.filter((_, i) => i !== idx)
    setter(newArr)
  }

  return (
    <Card sx={{ minWidth: 350, maxWidth: 500, margin: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Company Name"
            variant="standard"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            InputProps={{ disableUnderline: true, style: { fontSize: 24, fontWeight: 500 } }}
            fullWidth
          />
          <TextField
            label="Service Line"
            variant="standard"
            value={serviceLine}
            onChange={e => setServiceLine(e.target.value)}
            InputProps={{ disableUnderline: true, style: { color: 'rgba(0,0,0,0.6)' } }}
            fullWidth
          />
          <TextField
            label="Description"
            variant="standard"
            value={companyDescription}
            onChange={e => setCompanyDescription(e.target.value)}
            InputProps={{ disableUnderline: true }}
            fullWidth
            multiline
          />
          <div>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Tier 1 Keywords:</Typography>
            <Stack direction="row" spacing={1} sx={{ flex: 1, justifyContent: 'flex-start', flexWrap: 'wrap', mb: 1 }}>
              {tier1Keywords.map((kw, idx) => (
                <EditableChip
                  index={idx}
                  keyWords={tier1Keywords}
                  handleDeleteFromArray={handleDeleteFromArray}
                  handleArrayChange={handleArrayChange}
                  setKeywords={setTier1Keywords}
                  value={kw}
                  key={idx}
                />
              ))}
              <IconButton aria-label="add" onClick={() => handleAddToArray(setTier1Keywords, tier1Keywords)} size="small">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </div>
          <div>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Tier 2 Keywords:</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
              {tier2Keywords.map((kw, idx) => (
                <EditableChip
                  index={idx}
                  keyWords={tier2Keywords}
                  handleDeleteFromArray={handleDeleteFromArray}
                  handleArrayChange={handleArrayChange}
                  setKeywords={setTier2Keywords}
                  value={kw}
                  key={idx}
                />
              ))}
              <IconButton aria-label="add" onClick={() => handleAddToArray(setTier2Keywords, tier2Keywords)} size="small">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </div>
          <div>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Emails:</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1  }}>
              {emails.map((email, idx) => (
                <span key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                  <Chip label={email} variant="outlined" size="small" sx={{ mr: 0.5 }} />
                  <TextField
                    value={email}
                    onChange={e => handleArrayChange(setEmails, emails, idx, e.target.value)}
                    size="small"
                    variant="standard"
                    fullWidth
                    sx={{ width: 200 }}
                    InputProps={{ disableUnderline: false }}
                  />
                  <IconButton aria-label="delete" onClick={() => handleDeleteFromArray(setEmails, emails, idx)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </span>
              ))}
              <IconButton aria-label="add" onClick={() => handleAddToArray(setEmails, emails)} size="small">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </div>
          <TextField
            label="POC"
            variant="standard"
            value={poc}
            onChange={e => setPoc(e.target.value)}
            InputProps={{ disableUnderline: true }}
            fullWidth
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CompanyCard
