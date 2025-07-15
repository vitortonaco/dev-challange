import { Chip, TextField, IconButton, Typography } from "@mui/material"
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
        <Chip
          label={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Typography color="rgba(255,255,255,1)">{props.value}</Typography>
              <IconButton
                aria-label="edit"
                onClick={e => {
                  e.stopPropagation()
                  setEdit(true)
                }}
                size="small"
                sx={{ ml: 0.5, p: 0.25 }}
              >
                <EditIcon fontSize="small" sx={{ color: 'rgba(205, 197, 203, 1)' }} />
              </IconButton>
            </span>
          }
          size="small"
          sx={{ mr: 0.5, pr: 0.5, backgroundColor: "rgba(0,0,0,1)" }}
        />
      )}
      {edit && (
        <>
          <TextField
            value={props.value}
            onChange={e => props.handleArrayChange(props.setKeywords, props.keyWords, props.index, e.target.value)}
            size="small"
            variant="standard"
            InputProps={{
              disableUnderline: false,
              endAdornment: (
                <>
                  <IconButton
                    aria-label="close"
                    onClick={() => setEdit(false)}
                    size="small"
                    edge="end"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              ),
            }}
            sx={{ mx: 0.5, minWidth: '70px' }}
          />
          <IconButton aria-label="delete" onClick={() => props.handleDeleteFromArray(props.setKeywords, props.keyWords, props.index)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </span>
  )
}