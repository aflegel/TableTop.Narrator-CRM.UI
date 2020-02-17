import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSignalState } from "../Hooks/SignalState";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useRouteMatch } from 'react-router';

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

interface IdRoute {
	id: string;
}

const CompanyComponent: React.FC = () => {
	const classes = useStyles();
	const match = useRouteMatch<IdRoute>("/company/:id/card/");
	const id = match ? match.params.id || "" : "";

	const { counter, increase, decrease, incrementAsync, decrementAsync } = useSignalState("http://localhost:5100/encounter/sync", id);

	return (<Card className={classes.card}>
		<CardActionArea>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">{id}</Typography>
				<Typography variant="body2" color="textSecondary" component="p">Current: {counter.counter}</Typography>
				<Typography variant="body2" color="textSecondary" component="p">Change: {increase} or {decrease}</Typography>
			</CardContent>
		</CardActionArea>
		<CardActions>
			<Button size="small" color="primary" onClick={() => incrementAsync(counter.counter || 2)}>Increment</Button>
			<Button size="small" color="primary" onClick={() => decrementAsync(Math.floor(counter.counter / 2))}>Decrement</Button>
		</CardActions>
	</Card>
	);
}

export default CompanyComponent;
