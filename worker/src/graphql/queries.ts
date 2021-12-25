const catSegment = `
{
  name
  emoji
}
`;

const detectionSegment = `
{
  id
  intruders ${catSegment}
  complete
  direction
  date
  video {
    id
    provider
  }
}
`;

export const getCats = (): Query => ({
  query: `query getCats {
    cats ${catSegment}
  }`,
});

export const createDetection = (detection: Detection): Query => ({
  query: `mutation createDetection($detection: DetectionInput!) {
    createDetection(detection: $detection) ${detectionSegment}
  }`,
  variables: {
    detection,
  },
});

export const updateDetection = (detection: Detection): Query => ({
  query: `mutation updateDetection($detection: DetectionInput!) {
    updateDetection(detection: $detection) ${detectionSegment}
  }`,
  variables: {
    detection,
  },
});
