import { FormEvent, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import { Check, CaretDown, CaretUp } from "phosphor-react";
import { api } from '../lib/axios';

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    const habitsExamples = [
        'Ler 5 páginas de um livro',
        'Entrar no G1',
        'Nas horas vagas, se ausentar das redes por 2 horas',
    ]

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if (!title || weekDays.length == 0) {
            return
        }

        await api.post('/habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }

    function handleToggleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const newWeekDaysWithRemovedOne = weekDays.filter(day => day != weekDay)

            setWeekDays(newWeekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]

            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight" >
                Qual seu comprometimento?
            </label>

            <Select.Root required onValueChange={value => setTitle(value)}>
                <Select.Trigger
                    className='flex justify-center items-center p-3 rounded-lg mt-3 bg-zinc-800 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:text-white hover:text-white gap-4 group'
                    aria-label='Hábito'
                >
                    <Select.Value placeholder='Selecione um hábito' />
                    <Select.Icon>
                        <CaretDown
                            size={20}
                            className='text-zinc-400 group-hover:text-white group-focus:text-white'
                        />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content
                        className='overflow-hidden bg-zinc-900 mt-2 rounded-lg max-w-xs border border-zinc-800 p-2'
                    >
                        <Select.ScrollUpButton className='flex justify-center items-center'>
                            <CaretUp size={20} />
                        </Select.ScrollUpButton>

                        <Select.Viewport className='p-2 w-full flex flex-col justify-center items-center'>
                            <Select.Group>
                                {habitsExamples.map(habitItemExample => {
                                    return (
                                        <Select.Item
                                            value={habitItemExample}
                                            className='flex justify-start items-center gap-2 p-3 bg-zinc-700/40 rounded-md m-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
                                        >
                                            <Select.ItemIndicator>
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                            <Select.ItemText>
                                                {habitItemExample}
                                            </Select.ItemText>
                                        </Select.Item>
                                    )
                                })}
                            </Select.Group>
                        </Select.Viewport>

                        <Select.ScrollDownButton className='flex justify-center items-center'>
                            <CaretDown size={20} />
                        </Select.ScrollDownButton>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((weekDay, index) => {
                    return (
                        <Checkbox.Root
                            className='flex items-center gap-3 group focus:outline-none'
                            key={weekDay}
                            checked={weekDays.includes(index)}
                            onCheckedChange={() => handleToggleWeekDay(index)}
                        >
                            <div
                                className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'
                            >
                                <Checkbox.Indicator>
                                    <Check size={20} className='text-white' />
                                </Checkbox.Indicator>
                            </div>

                            <span className=' text-white leading-tight'>
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                })}

            </div>

            <button
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight='bold' />
                Confirmar
            </button>
        </form>
    )
}