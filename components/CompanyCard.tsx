
import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close';


import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { EditableChip } from './EditableChip'
import DeleteIcon from '@mui/icons-material/Delete'

export type CompanyCardData = {
  company_name: string
  service_line: string[]
  company_description: string
  tier1_keywords: string[]
  tier2_keywords: string[]
  emails: string[]
  poc: string[]
  clearResult: () => void
}

function CompanyCard(props: CompanyCardData) {
  const [companyName, setCompanyName] = useState(props.company_name)
  const [serviceLines, setServiceLines] = useState<string[]>(props.service_line)
  const [companyDescription, setCompanyDescription] = useState(props.company_description)
  const [tier1Keywords, setTier1Keywords] = useState<string[]>(props.tier1_keywords)
  const [tier2Keywords, setTier2Keywords] = useState<string[]>(props.tier2_keywords)
  const [emails, setEmails] = useState<string[]>(props.emails)
  const [poc, setPoc] = useState<string[]>(props.poc)

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

  const stackStyle = {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    mb: 1,
    paddingvertical: 1,
  }

  return (
    <Card sx={{ minWidth: 350, maxWidth: 500, margin: 2, backgroundColor: '#dfdfdfff' , position: 'relative'}}>
      <IconButton
        onClick={() => props.clearResult()}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
        }}
      >
         <CloseIcon />
       </IconButton>
      <CardContent>
        <Stack spacing={2}>
          <Typography
            fontWeight={'bold'}
            textAlign={'center'}

            variant='h5'
            sx={{ width: '100%', paddingTop: 4 }}
          >
            {companyName}
          </Typography>
          <div>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Service Line(s): </Typography>
            <Stack direction="row" spacing={1} sx={stackStyle}>
              {serviceLines.map((kw, idx) => (
                <EditableChip
                  index={idx}
                  keyWords={tier1Keywords}
                  handleDeleteFromArray={handleDeleteFromArray}
                  handleArrayChange={handleArrayChange}
                  setKeywords={setServiceLines}
                  value={kw}
                  key={idx}
                />
              ))}
              <IconButton aria-label="add" onClick={() => handleAddToArray(setServiceLines, serviceLines)} size="small">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </div>
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
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Keywords that the company would use when searching for a government opportunity:</Typography>
            <Stack direction="row" spacing={1} sx={stackStyle}>
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
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Keywords that the company might use when searching for a government opportunity:</Typography>
            <Stack direction="row" spacing={1} sx={stackStyle}>
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
            <Stack direction="row" spacing={1} sx={stackStyle}>
              {emails.map((email, idx) => (
                <EditableChip
                  index={idx}
                  keyWords={emails}
                  handleDeleteFromArray={handleDeleteFromArray}
                  handleArrayChange={handleArrayChange}
                  setKeywords={setEmails}
                  value={email}
                  key={idx}
                />
              ))}
              <IconButton aria-label="add" onClick={() => handleAddToArray(setEmails, emails)} size="small">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </div>
          <div>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>POC(s): </Typography>
            <Stack direction="row" spacing={1} sx={stackStyle}>
              {poc.map((kw, idx) => (
                <EditableChip
                  index={idx}
                  keyWords={poc}
                  handleDeleteFromArray={handleDeleteFromArray}
                  handleArrayChange={handleArrayChange}
                  setKeywords={setPoc}
                  value={kw}
                  key={idx}
                />
              ))}
              <IconButton aria-label="add" onClick={() => handleAddToArray(setPoc, poc)} size="small">
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CompanyCard
