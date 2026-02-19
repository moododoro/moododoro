import { useState } from "react";
import type { Dispatch } from "react";
import type { Timer, TimerAction } from "../api/timerReducer";
import DurationInput from "./DurationInput";
import Button from "./Button";
import Card from "./Card";
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
                <Card>
                    <DurationInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setWorkDuration(+e.target.value)
                        }
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch({
                                type: "CHANGE_DURATION",
                                field: "work",
                                value: workDuration,
                            });
                        }}
                        label={"Enter work time: "}
                        value={workDuration}
                    />
                    <DurationInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSBDuration(+e.target.value)
                        }
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch({
                                type: "CHANGE_DURATION",
                                field: "shortBreak",
                                value: sbDuration,
                            });
                        }}
                        label={"Enter shortbreak time: "}
                        value={sbDuration}
                    />
                    <DurationInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setLBDuration(+e.target.value)
                        }
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch({
                                type: "CHANGE_DURATION",
                                field: "longBreak",
                                value: lbDuration,
                            });
                        }}
                        label={"Enter longbreak time: "}
                        value={lbDuration}
                    />
                    <DurationInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setLongBreakInt(+e.target.value)
                        }
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch({
                                type: "CHANGE_LB_INTERVAL",
                                value: longBreakInt,
                            });
                        }}
                        label={"Change long break interval: "}
                        value={longBreakInt}
                    />
                    <Button
                        label={`Set autostart: ${state.autoStart}`}
                        onClick={() => dispatch({ type: "CHANGE_AUTOSTART" })}
                    />
                </Card>
            )}
        </>
    );
};

export default Header;
