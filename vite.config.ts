import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        aiTextHelper: 'projects/ai-text-helper/index.html',
        snapkeep: 'projects/snapkeep/index.html',
        agentSafeFlow: 'projects/agent-safe-flow/index.html',
        ragRetrievalResearch: 'projects/rag-retrieval-research/index.html',
        codebaseAtlas: 'projects/codebase-atlas/index.html',
        contextWaypoint: 'projects/context-waypoint/index.html',
        humanWriting: 'projects/human-writing/index.html',
      },
    },
  },
})
