import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

function Note({ id, title = 'A title', text = 'Some content' }) {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <CardContent>
        <header>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </header>
        <Divider />
        <main>
          <Typography>{text}</Typography>
        </main>
      </CardContent>
    </Card>
  );
}

export default Note;
