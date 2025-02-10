import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { deleteSeminarById, editSeminarById } from '@/features';
import { Modal } from '@/shared/ui/Modal';
import { Form } from '@/shared/ui/Form';
import { Button } from '@/shared/ui/Buttons';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { useAppDispatch } from '@/shared/libs/hooks';
import { seminarType } from '@/shared/libs/types';

import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';

import styles from './SeminarCard.module.scss';

export interface FormState extends seminarType {}

interface SeminarCardProps {
    className?: string;
    seminar: seminarType;
}

export const SeminarCard = (props: SeminarCardProps) => {
    const { className = '', seminar } = props;

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { id, title, description, date, time, photo } = seminar;

    const { register, handleSubmit } = useForm<FormState>({
        defaultValues: {
            id: id,
            title: title,
            description: description,
            date: date,
            time: time,
            photo: photo,
        },
    });

    const dispatch = useAppDispatch();

    const deleteCard = (id: number) => {
        onCloseDeleteModal();
        dispatch(deleteSeminarById(id));
    };

    const onShowDeleteModal = useCallback(() => setIsDeleteModalOpen(true), []);
    const onCloseDeleteModal = useCallback(
        () => setIsDeleteModalOpen(false),
        [],
    );

    const onShowEditModal = useCallback(() => setIsEditModalOpen(true), []);
    const onCloseEditModal = useCallback(() => setIsEditModalOpen(false), []);

    const onSubmitHandler: SubmitHandler<FormState> = (data: seminarType) => {
        onCloseEditModal();
        dispatch(editSeminarById(data));
    };

    return (
        <>
            <div className={classNames(styles.seminarCard, [className])}>
                <div className={styles.imageBlock} draggable={false}>
                    {!isImageLoaded ? (
                        <Skeleton
                            style={{
                                borderRadius: 32,
                                transition: 'all 0.3s ease-in-out',
                            }}
                            width={'100%'}
                            height={300}
                            baseColor="var(--skeleton-base-color)"
                            highlightColor="var(--skeleton-highlight-color)"
                        />
                    ) : (
                        ''
                    )}
                    <img
                        src={photo}
                        className={styles.image}
                        alt="Image of seminar"
                        style={isImageLoaded ? {} : { display: 'none' }}
                        onLoad={() => setIsImageLoaded(true)}
                        draggable={false}
                    />
                </div>
                <div className={styles.textBlock}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.datetimeBlock}>
                        <p className={styles.datetimeBlock_date}>{date}</p>
                        <p className={styles.datetimeBlock_time}>{time}</p>
                    </div>
                </div>
                <div className={styles.buttonsBlock}>
                    <Button
                        onClick={() => {
                            onShowDeleteModal();
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            onShowEditModal();
                        }}
                    >
                        <EditIcon />
                    </Button>
                </div>
            </div>

            {/* Delete seminar Modal Window */}
            <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
                <h2 className={styles.modal_title}>
                    Confirmation of the action
                </h2>
                <hr
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        height: '2px',
                    }}
                />
                <p className={styles.modal_text}>
                    Are you sure you want to delete the seminar entry?
                    <br />
                    After confirmation, the action{' '}
                    <span className={styles.modal_text__primary}>
                        cannot be canceled
                    </span>
                    .
                </p>
                <div className={styles.modal_buttonBlock}>
                    <Button isWarn onClick={() => deleteCard(id)}>
                        Accept
                    </Button>
                    <Button onClick={() => onCloseDeleteModal()}>Cancel</Button>
                </div>
            </Modal>

            {/* Edit seminar Modal Window */}
            <Modal isOpen={isEditModalOpen} onClose={onCloseEditModal}>
                <h2 className={styles.modal_title}>Editing of seminar</h2>
                <hr
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        height: '2px',
                    }}
                />
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Input
                        name="title"
                        label="Seminar title: "
                        type="text"
                        placeholder="Title"
                        register={register}
                    />
                    <Textarea
                        rows={3}
                        spellCheck={true}
                        name="description"
                        label="Seminar description: "
                        placeholder="Description"
                        register={register}
                    />
                    <Input
                        name="date"
                        label="Seminar date: "
                        type="text"
                        placeholder="12.02.2025"
                        register={register}
                    />
                    <Input
                        name="time"
                        label="Seminar time: "
                        type="text"
                        placeholder="10:00"
                        register={register}
                    />
                    <Input
                        name="photo"
                        label="Seminar photo (URL): "
                        type="text"
                        register={register}
                    />
                    <div className={styles.modal_form_buttonBlock}>
                        <Button type="submit" isAccept onClick={() => {}}>
                            Edit
                        </Button>
                        <Button onClick={() => onCloseEditModal()}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
