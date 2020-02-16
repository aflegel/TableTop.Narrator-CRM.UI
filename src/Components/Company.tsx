import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSignalState } from "../Hooks/SignalState";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

interface State {
	group: string;
}

const CompanyComponent: React.FC = () => {
	const classes = useStyles();
	const { counter, incrementAsync, decrementAsync, joinAsync, leaveAsync } = useSignalState("http://localhost:5100/encounter");
	useSignalState("http://localhost:5100/company");

	const [values, setValues] = useState<State>({
		group: "Cat in the Hat",
	});

	const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [name]: event.target.value });
	};

	return (<Card className={classes.card}>
		<CardActionArea>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">Current Count</Typography>
				<Typography variant="body2" color="textSecondary" component="p">{counter.counter}</Typography>
				<form noValidate autoComplete="off">
					<TextField id="standard-name" label="Name" className={classes.textField} value={values.group} margin="normal" onChange={handleChange("group")} />
				</form>
			</CardContent>
		</CardActionArea>
		<CardActions>
			<Button size="small" color="primary" onClick={() => joinAsync(1)}>Increment</Button>
			<Button size="small" color="primary" onClick={() => decrementAsync()}>Decrement</Button>

		</CardActions>
	</Card>
	);
}

export default CompanyComponent;
