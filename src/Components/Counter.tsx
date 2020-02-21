import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useCounter } from "../Hooks/UseCounter/Hook";
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
	const { counter, incrementAsync, decrementAsync } = useCounter("http://localhost:5100/encounter/sync", companyContext.companyId);

	return (<Card className={classes.card}>
		<CardActionArea>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">{companyContext.companyId}</Typography>
				<Typography variant="body2" color="textSecondary" component="p">Current: {counter.counter}</Typography>
				<Typography variant="body2" color="textSecondary" component="p">Changed by: {counter.change}</Typography>
			</CardContent>
		</CardActionArea>
		<CardActions>
			<Button size="small" color="primary" onClick={() => incrementAsync(counter.counter || 2)}>Increment by {counter.counter || 2}</Button>
			<Button size="small" color="primary" onClick={() => decrementAsync(Math.floor(counter.counter / 2))}>Decrement by {Math.floor(counter.counter / 2)}</Button>
		</CardActions>
	</Card>
	);
}
