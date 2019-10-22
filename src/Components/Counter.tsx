import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CompanyContext } from './CompanyContext';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			maxWidth: 345
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200
		}
	}),
);


export const Counter: React.FC = () => {
	const classes = useStyles();
	const companyContext = useContext(CompanyContext);

	return (<Card className={classes.card}>
		<CardActionArea>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">{companyContext.companyId}</Typography>
			</CardContent>
		</CardActionArea>
		<CardActions>
		</CardActions>
	</Card>
	);
}
