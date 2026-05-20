import CardActionArea from '@mui/material/CardActionArea';
import { StyledCard } from './StyledCard';
import CardContent from '@mui/material/CardContent';
import { Box } from 'lucide-react';
import Skeleton from '@mui/material/Skeleton';

function LoadingArticle() {
  return (
    <StyledCard>
      <CardActionArea>
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: '5rem' }}></Skeleton>
          <Skeleton variant="text" sx={{ fontSize: '1.5rem' }}></Skeleton>
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton
          variant="text"
          width={200}
          sx={{ fontSize: '1.5rem' }}
        ></Skeleton>
        <Skeleton
          variant="text"
          width={200}
          sx={{ fontSize: '1.5rem' }}
        ></Skeleton>
      </Box>
    </StyledCard>
  );
}

export default LoadingArticle;
