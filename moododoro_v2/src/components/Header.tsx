import { useEffect, useState } from 'react';
import type { Dispatch } from 'react';
import type { Timer, TimerAction } from '../api/timerReducer';
import DurationInput from './DurationInput';
import Button from './Button';
import Card from './Card';
const logo = `${import.meta.env.BASE_URL}images/cow.png`;
/**
 * Just one big navbar with proper colors.
 * @returns
 */
interface HeaderProps {
    state: Timer;
    dispatch: Dispatch<TimerAction>;
}
const Header = ({ state, dispatch }: HeaderProps) => {
    const [workDuration, setWorkDuration] = useState<number>(0);
    const [sbDuration, setSBDuration] = useState<number>(0);
    const [lbDuration, setLBDuration] = useState<number>(0);
    const [longBreakInt, setLongBreakInt] = useState<number>(0);
    const [showSettings, setShowSettings] = useState(false);
    const [showBgCard, setShowBgCard] = useState(false);

    useEffect(() => {
        // when settings transitions from true to false, submit form
    }, [showSettings]);

    return (
        <>
            <div className="min-w-screen m-0 p-0 border-b bg-secondary flex">
                <img src={logo} width="50px" className="mx-2 my-0.5" />
                <h3 className="text-3xl px-2">moododoro</h3>
                <h3
                    className="text-3xl px-2 hover:cursor-pointer hover:bg-[#cfcbc4]"
                    onClick={() => {
                        console.log(typeof state);
                        setShowSettings((prev) => !prev);
                        setShowBgCard(false);
                    }}
                >
                    settings
                </h3>
                <h3
                    className="text-3xl px-2 hover:cursor-pointer hover:bg-[#cfcbc4]"
                    onClick={() => {
                        setShowBgCard((prev) => !prev);
                        setShowSettings(false);
                    }}
                >
                    background
                </h3>
            </div>
            {showSettings && (
                <>
                    <div
                        className="fixed inset-0"
                        onClick={() => {
                            setShowSettings(false);
                            // validate inputs before submission
                            if (workDuration > 0) {
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'work',
                                    value: workDuration,
                                });
                            }

                            if (sbDuration > 0) {
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'shortBreak',
                                    value: sbDuration,
                                });
                            }

                            if (lbDuration > 0) {
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'longBreak',
                                    value: lbDuration,
                                });
                            }

                            if (longBreakInt > 0) {
                                dispatch({
                                    type: 'CHANGE_LB_INTERVAL',
                                    value: longBreakInt,
                                });
                            }
                        }}
                    />
                    <Card>
                        <DurationInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setWorkDuration(+e.target.value)}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                setWorkDuration(+e.target.value)
                            }
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'work',
                                    value: workDuration,
                                });
                            }}
                            label={'Enter work time (min): '}
                            value={workDuration}
                        />
                        <DurationInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setSBDuration(+e.target.value)}
                            onBlur={(e) => {
                                // should prob refactor to handleSubmit
                                e.preventDefault();
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'longBreak',
                                    value: lbDuration,
                                });
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'shortBreak',
                                    value: sbDuration,
                                });
                            }}
                            label={'Enter shortbreak time (min): '}
                            value={sbDuration}
                        />
                        <DurationInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setLBDuration(+e.target.value)}
                            onBlur={(e) => {
                                e.preventDefault();
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'longBreak',
                                    value: lbDuration,
                                });
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch({
                                    type: 'CHANGE_DURATION',
                                    field: 'longBreak',
                                    value: lbDuration,
                                });
                            }}
                            label={'Enter longbreak time (min): '}
                            value={lbDuration}
                        />
                        <DurationInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setLongBreakInt(+e.target.value)}
                            onBlur={(e) => {
                                e.preventDefault();
                                dispatch({
                                    type: 'CHANGE_LB_INTERVAL',
                                    value: longBreakInt,
                                });
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch({
                                    type: 'CHANGE_LB_INTERVAL',
                                    value: longBreakInt,
                                });
                            }}
                            label={'Change long break interval: '}
                            value={longBreakInt}
                        />
                        <Button
                            label={`Set autostart: ${state.autoStart}`}
                            onClick={() =>
                                dispatch({ type: 'CHANGE_AUTOSTART' })
                            }
                        />
                    </Card>
                </>
            )}
        </>
    );
};

export default Header;
