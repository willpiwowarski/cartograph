window.GRAPH = {
  "nodes": [
    {
      "id": "app/page.tsx:loadDatasets",
      "label": "app/page.tsx:loadDatasets"
    },
    {
      "id": "app/page.tsx:Home",
      "label": "app/page.tsx:Home"
    },
    {
      "id": "app/page.tsx:handleFileUpload",
      "label": "app/page.tsx:handleFileUpload"
    },
    {
      "id": "components/AskAIPanel.tsx:load",
      "label": "components/AskAIPanel.tsx:load"
    },
    {
      "id": "components/AskAIPanel.tsx:AskAIPanel",
      "label": "components/AskAIPanel.tsx:AskAIPanel"
    },
    {
      "id": "components/AskAIPanel.tsx:handleSubmit",
      "label": "components/AskAIPanel.tsx:handleSubmit"
    },
    {
      "id": "components/ChartSection.tsx:ChartSection",
      "label": "components/ChartSection.tsx:ChartSection"
    },
    {
      "id": "components/DatasetWorkspace.tsx:DatasetWorkspace",
      "label": "components/DatasetWorkspace.tsx:DatasetWorkspace"
    },
    {
      "id": "components/DatasetWorkspace.tsx:handleNaturalLanguageCommand",
      "label": "components/DatasetWorkspace.tsx:handleNaturalLanguageCommand"
    },
    {
      "id": "app/datasets/page.tsx:loadDatasets",
      "label": "app/datasets/page.tsx:loadDatasets"
    },
    {
      "id": "app/datasets/page.tsx:DatasetsPage",
      "label": "app/datasets/page.tsx:DatasetsPage"
    },
    {
      "id": "app/datasets/[id]/page.tsx:loadDataset",
      "label": "app/datasets/[id]/page.tsx:loadDataset"
    },
    {
      "id": "app/datasets/[id]/page.tsx:DatasetDetailPage",
      "label": "app/datasets/[id]/page.tsx:DatasetDetailPage"
    },
    {
      "id": "app/api/ai/ask/route.ts:POST",
      "label": "app/api/ai/ask/route.ts:POST"
    },
    {
      "id": "app/api/ai/chart/route.ts:validateChartConfig",
      "label": "app/api/ai/chart/route.ts:validateChartConfig"
    },
    {
      "id": "app/api/ai/chart/route.ts:tryParseAndValidate",
      "label": "app/api/ai/chart/route.ts:tryParseAndValidate"
    },
    {
      "id": "app/api/ai/chart/route.ts:buildRetryPrompt",
      "label": "app/api/ai/chart/route.ts:buildRetryPrompt"
    },
    {
      "id": "app/api/ai/chart/route.ts:POST",
      "label": "app/api/ai/chart/route.ts:POST"
    },
    {
      "id": "lib/api.ts:getDatasets",
      "label": "lib/api.ts:getDatasets"
    },
    {
      "id": "lib/detectColumns.ts:detectColumns",
      "label": "lib/detectColumns.ts:detectColumns"
    },
    {
      "id": "lib/api.ts:uploadDataset",
      "label": "lib/api.ts:uploadDataset"
    },
    {
      "id": "lib/api.ts:loadConversation",
      "label": "lib/api.ts:loadConversation"
    },
    {
      "id": "lib/api.ts:askAI",
      "label": "lib/api.ts:askAI"
    },
    {
      "id": "components/ChartSection.tsx:aggregateValues",
      "label": "components/ChartSection.tsx:aggregateValues"
    },
    {
      "id": "lib/generateInsights.ts:generateInsights",
      "label": "lib/generateInsights.ts:generateInsights"
    },
    {
      "id": "lib/api.ts:generateChartWithAI",
      "label": "lib/api.ts:generateChartWithAI"
    },
    {
      "id": "lib/api.ts:getDataset",
      "label": "lib/api.ts:getDataset"
    },
    {
      "id": "app/api/ai/ask/route.ts:formatHistory",
      "label": "app/api/ai/ask/route.ts:formatHistory"
    },
    {
      "id": "app/api/ai/chart/route.ts:isRecord",
      "label": "app/api/ai/chart/route.ts:isRecord"
    },
    {
      "id": "app/api/ai/chart/route.ts:stripFences",
      "label": "app/api/ai/chart/route.ts:stripFences"
    },
    {
      "id": "app/api/ai/chart/route.ts:buildBasePrompt",
      "label": "app/api/ai/chart/route.ts:buildBasePrompt"
    }
  ],
  "edges": [
    {
      "from": "app/page.tsx:loadDatasets",
      "to": "lib/api.ts:getDatasets"
    },
    {
      "from": "app/page.tsx:Home",
      "to": "app/page.tsx:loadDatasets"
    },
    {
      "from": "app/page.tsx:handleFileUpload",
      "to": "lib/detectColumns.ts:detectColumns"
    },
    {
      "from": "app/page.tsx:handleFileUpload",
      "to": "lib/api.ts:uploadDataset"
    },
    {
      "from": "components/AskAIPanel.tsx:load",
      "to": "lib/api.ts:loadConversation"
    },
    {
      "from": "components/AskAIPanel.tsx:AskAIPanel",
      "to": "components/AskAIPanel.tsx:load"
    },
    {
      "from": "components/AskAIPanel.tsx:handleSubmit",
      "to": "lib/api.ts:askAI"
    },
    {
      "from": "components/ChartSection.tsx:ChartSection",
      "to": "components/ChartSection.tsx:aggregateValues"
    },
    {
      "from": "components/DatasetWorkspace.tsx:DatasetWorkspace",
      "to": "lib/generateInsights.ts:generateInsights"
    },
    {
      "from": "components/DatasetWorkspace.tsx:handleNaturalLanguageCommand",
      "to": "lib/api.ts:generateChartWithAI"
    },
    {
      "from": "app/datasets/page.tsx:loadDatasets",
      "to": "lib/api.ts:getDatasets"
    },
    {
      "from": "app/datasets/page.tsx:DatasetsPage",
      "to": "app/datasets/page.tsx:loadDatasets"
    },
    {
      "from": "app/datasets/[id]/page.tsx:loadDataset",
      "to": "lib/api.ts:getDataset"
    },
    {
      "from": "app/datasets/[id]/page.tsx:loadDataset",
      "to": "lib/detectColumns.ts:detectColumns"
    },
    {
      "from": "app/datasets/[id]/page.tsx:DatasetDetailPage",
      "to": "app/datasets/[id]/page.tsx:loadDataset"
    },
    {
      "from": "app/api/ai/ask/route.ts:POST",
      "to": "app/api/ai/ask/route.ts:formatHistory"
    },
    {
      "from": "app/api/ai/chart/route.ts:validateChartConfig",
      "to": "app/api/ai/chart/route.ts:isRecord"
    },
    {
      "from": "app/api/ai/chart/route.ts:tryParseAndValidate",
      "to": "app/api/ai/chart/route.ts:stripFences"
    },
    {
      "from": "app/api/ai/chart/route.ts:tryParseAndValidate",
      "to": "app/api/ai/chart/route.ts:isRecord"
    },
    {
      "from": "app/api/ai/chart/route.ts:tryParseAndValidate",
      "to": "app/api/ai/chart/route.ts:validateChartConfig"
    },
    {
      "from": "app/api/ai/chart/route.ts:buildRetryPrompt",
      "to": "app/api/ai/chart/route.ts:buildBasePrompt"
    },
    {
      "from": "app/api/ai/chart/route.ts:POST",
      "to": "app/api/ai/chart/route.ts:buildBasePrompt"
    },
    {
      "from": "app/api/ai/chart/route.ts:POST",
      "to": "app/api/ai/chart/route.ts:tryParseAndValidate"
    },
    {
      "from": "app/api/ai/chart/route.ts:POST",
      "to": "app/api/ai/chart/route.ts:buildRetryPrompt"
    },
    {
      "from": "app/api/ai/chart/route.ts:POST",
      "to": "app/api/ai/chart/route.ts:isRecord"
    }
  ]
};