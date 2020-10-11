export const getThemesFromMarketplace = (searchTerm?: string) => {
  const requestURI = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery?api-version=6.1-preview.1';
  const requestBody = {
    "assetTypes": ["Microsoft.VisualStudio.Services.Icons.Default","Microsoft.VisualStudio.Services.Icons.Branding","Microsoft.VisualStudio.Services.Icons.Small"],
    "filters": [
      {
        "criteria": [
          {
            "filterType": 8,
            "value": "Microsoft.VisualStudio.Code"
          },
          {
            "filterType": 10,
            "value": searchTerm? searchTerm: "target: \"Microsoft.VisualStudio.Code\""
          },
          {
            "filterType":12,
            "value":"37888"
          },
          {
            "filterType": 5,
            "value": "Themes"
          }
        ],
        "direction": 2,
        "pageSize": 54,
        "pageNumber": 1,
        "sortBy": 4,
        "sortOrder": 0
      }
    ],
    "flags": 870
  }

  return fetch(requestURI, {
    body: JSON.stringify(requestBody),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}
