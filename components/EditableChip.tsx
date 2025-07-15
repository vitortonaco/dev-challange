import { Chip, TextField, IconButton } from "@mui/material"
import React, { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';


type EditableChipProps = {
  index: number
  value: string
  handleArrayChange: (
      setter: React.Dispatch<React.SetStateAction<string[]>>,
      arr: string[], 
      idx: number, 
      value: string
    ) => void
  handleDeleteFromArray: (
      setter: React.Dispatch<React.SetStateAction<string[]>>, 
      arr: string[], 
      idx: number
    ) => void
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
  keyWords: string[]
}

export function EditableChip(props: EditableChipProps) {
  const [edit, setEdit] = useState(false)


  return(
    <span key={props.index} style={{ display: 'flex', alignItems: 'center' }}>
      {!edit && (
        <>
          <Chip label={props.value} color="primary" size="small" sx={{ mr: 0.5 }} />
          <IconButton aria-label="delete" onClick={() => setEdit(true)} size="small">
              <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}
      {edit && (
        <>
          <TextField
            value={props.value}
            onChange={e => props.handleArrayChange(props.setKeywords, props.keyWords, props.index, e.target.value)}
            size="small"
            variant="standard"
            InputProps={{ disableUnderline: false }}
            sx={{ width: 70, mx: 0.5 }}
          />
          <IconButton aria-label="delete" onClick={() => props.handleDeleteFromArray(props.setKeywords, props.keyWords, props.index)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => setEdit(false)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </span>
  )
}