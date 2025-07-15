'use client';

import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Input, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { errorResponse } from './api/route';
import CompanyCard, { CompanyCardData } from '../../components/CompanyCard';

const mockCompanyData = {
  company_name: 'Example Corp',
  service_line: 'Software Development',
  company_description: 'A leading software development company specializing in web and mobile applications.',
  tier1_keywords: ['software', 'development', 'web', 'mobile'],
  tier2_keywords: ['agile', 'scrum', 'devops'],
  emails: ['contact@example.com', 'info@example.com'],
  poc: 'John Doe, CEO'
} as CompanyCardData;

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<CompanyCardData | null>(mockCompanyData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('Error message updated:', errorMessage);
  }, [errorMessage]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (data && data.error) {
        setErrorMessage(data.code);
        return;
      }
      setResult(data.data || data.error);
      console.log(data);
    } catch (err: errorResponse | any) {
      setErrorMessage('erro');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper
      elevation={0}
      sx={{
      minHeight: '95vh',
      minWidth: '75vw',
      padding: 18,
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
        fontSize={24}
      >
        Get Company Info
      </Typography>
      <Paper 
        elevation={1}
        sx={{
          display: 'flex',
          width: '50vw',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          borderRadius: 8
        }}>
        <TextField
          placeholder='Enter URL to analyze'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          inputProps={{
                  onKeyDown: (event) => {
                    if (event.key === "Enter") {
                      // write your functionality here
                      event.preventDefault();
                    }
                  },
                }}
        />
        <Button 
          variant='contained' 
          onClick={handleAnalyze} 
          disabled={loading || !url}
          sx={{ marginLeft: 2 }}
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
          <IconButton
            onClick={() => setResult(null)}
            sx={{  top: 56, right: -516 }}
          >
            <CloseIcon />
          </IconButton>
          <CompanyCard
            company_name={result.company_name}
            service_line={result.service_line}
            company_description={result.company_description}
            tier1_keywords={result.tier1_keywords}
            tier2_keywords={result.tier2_keywords}
            emails={result.emails}
            poc={result.poc}
          />
        </Paper>
      )}
    </Paper>
  )
}
