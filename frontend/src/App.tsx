import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CharacterProvider } from './context/CharacterContext';
import { VoiceProvider } from './context/VoiceContext';
import { AppLayout } from './components/Layout/AppLayout';

// Pages
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { History } from './pages/History';
import { Notes } from './pages/Notes';
import { Tasks } from './pages/Tasks';
import { Files } from './pages/Files';
import { DeveloperMode } from './pages/DeveloperMode';
import { StudyMode } from './pages/StudyMode';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <ThemeProvider>
      <CharacterProvider>
        <VoiceProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/history" element={<History />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/files" element={<Files />} />
                <Route path="/developer" element={<DeveloperMode />} />
                <Route path="/study" element={<StudyMode />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </VoiceProvider>
      </CharacterProvider>
    </ThemeProvider>
  );
}
