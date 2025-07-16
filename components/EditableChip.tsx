import { Chip, TextField, IconButton, Typography } from "@mui/material"
import React, { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';


type EditableChipProps = {
  index: number
  value: string
  notDeletable?: boolean
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
    <span key={props.index} style={{ display: 'flex', alignItems: 'center' , paddingTop: 2 }}>
      {!edit && (
        <Chip
          label={
            <span style={{ display: 'flex', alignItems: 'center', flex: 1 ,whiteSpace: 'normal', wordBreak: 'break-word' }}>
              <Typography textAlign={'center'} color="rgba(255,255,255,1)" paddingY={1}>{props.value}</Typography>
            </span>
          }
          size="small"
          clickable
          onClick={() => setEdit(true)}
          sx={{ 
            mr: 0.5, 
            pr: 0.5, 
            flex: 1,
            height: 'auto', 
            minHeight: '32px', 
            backgroundColor: "rgba(0,0,0,1)",
            "&:hover": {
              backgroundColor: "rgba(47, 2, 76, 0.2)", 
              "& .MuiTypography-root": {
                color: "rgba(0,0,0,1)",
              }
            }
          }}
        />
      )}
      {edit && (
        <>
          <TextField
            value={props.value}
            onChange={e => props.handleArrayChange(props.setKeywords, props.keyWords, props.index, e.target.value)}
            size="small"
            variant="standard"
            multiline
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
            sx={{ mx: 0.5, minWidth: '70px', flex: 1 }}
          />
          {!props.notDeletable && (
            <IconButton aria-label="delete" onClick={() => props.handleDeleteFromArray(props.setKeywords, props.keyWords, props.index)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </>
      )}
    </span>
  )
}