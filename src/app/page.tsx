'use client'

import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { Button, IconButton, Input, TextField, Typography } from '@mui/material'
import { errorResponse } from './api/route'
import CompanyCard, { CompanyCardData } from '../../components/CompanyCard'


// for debug purposes, use mock data when credits are not available in API
// const mockCompanyData = {
//   company_name: 'Example Corp',
//   service_line: ['Software Development'],
//   company_description: 'A leading software development company specializing in web and mobile applications.',
//   tier1_keywords: ['software', 'development', 'web', 'mobile'],
//   tier2_keywords: ['agile', 'scrum', 'devops'],
//   emails: ['contact@example.com', 'info@example.com'],
//   poc: ['John Doe, CEO']
// } as CompanyCardData

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<CompanyCardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent | undefined) => {
    e?.preventDefault()
    setLoading(true)
    setResult(null)
    setErrorMessage(null)

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()

      if (data && data.error) {
        setErrorMessage(data.code ?? data.error)
        return
      }
      console.log('Open AI API Response:', data)
      const parsedData = typeof data.data === 'string' ? JSON.parse(data.data) : data.data
      setResult(parsedData)
      
    } catch (err: errorResponse | any) {
      setErrorMessage(err.message || 'An error occurred while processing your request.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Paper
      elevation={0}
      sx={{
      minHeight: '95vh',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      minWidth: '75vw',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      }}
      square
    >
      {!result && (
        <>
          <Typography 
            fontWeight={'bold'}
            padding={4}
            fontSize={36}
            textAlign={'center'}
            color='rgba(31, 31, 31, 0.87)'
            maxWidth={ '55vw'}
          >
            Get Company Information for Government Opportunities
          </Typography>
          <Paper 
            elevation={4}
            sx={{
              display: 'flex',
              width: '50vw',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              borderRadius: 8,
              backgroundColor: 'rgba(239, 239, 239, 1)'
            }}>
            <TextField
              placeholder='Enter URL to analyze'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              inputProps={{
                      onKeyDown: (event) => {
                        if (event.key === "Enter") {
                          handleAnalyze(undefined)
                          event.preventDefault()
                        }
                      },
                    }}
              />
            <Button 
              variant='contained' 
              onClick={handleAnalyze} 
              disabled={loading || !url}
              sx={{ marginLeft: 2, borderRadius: 2 }}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
            </Paper>
            {(errorMessage) && (
            <Typography color={"error"} sx={{ marginTop: 2 }}>
              {errorMessage && `OpenAI API Error: ${errorMessage}`}
            </Typography>
          )}
        </>
      )}
      {result && (
        <Paper elevation={0}>
            
          <CompanyCard
            company_name={result.company_name}
            service_line={result.service_line}
            company_description={result.company_description}
            tier1_keywords={result.tier1_keywords}
            tier2_keywords={result.tier2_keywords}
            emails={result.emails}
            poc={result.poc}
            clearResult={() => setResult(null)}
          />
        </Paper>
      )}
    </Paper>
  )
}
