<template>
    <div class="navbar-content"
        :class="$attrs.class">
        <core-operation v-bind="$attrs">
            <template #default="{
                    elapsed, end, events, ioTypes,
                    operation, remaining, toggle
                }">
                <div class="level is-mobile is-marginless">
                    <div class="level-left">
                        <div class="level-item">
                            <p class="one-line">
                                <span class="has-text-weight-bold">
                                    {{ ioTypes._get(operation.type) }}:&nbsp;
                                </span>
                                <slot name="status"
                                    :operation="operation"/>
                            </p>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <avatar class="media is-24x24"
                                :user="operation.owner"/>
                        </div>
                    </div>
                </div>
                <slot name="body" :operation="operation"/>
                <div class="level is-mobile pt-1
                    pb-1 is-marginless">
                    <div class="level-item">
                        <progress class="progress is-xsmall is-dark"
                            :value="operation.progress"
                            max="100"
                            v-if="operation.progress !== null">
                            {{ operation.progress }}%
                        </progress>
                        <progress class="progress is-xsmall is-dark"
                            max="100"
                            v-else>
33%
                        </progress>
                    </div>
                    <div class="level-item is-narrow">
                        <a class="button is-small is-naked"
                            v-on="events">
                            <fa icon="times-circle"/>
                        </a>
                    </div>
                </div>
                <div class="level is-mobile">
                    <div class="level-left">
                        <slot name="info"
                        :operation="operation"/>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <template v-if="end">
                                <span class="is-size-7 has-text-weight-bold"
                                    v-if="remaining">
                                    {{ remaining }}
                                </span>
                                <span class="icon is-small"
                                    v-else>
                                    <fa icon="spinner"
                                        pulse/>
                                </span>
                            </template>
                            <span class="is-size-7 has-text-weight-bold"
                                v-else>
                                {{ elapsed }}
                            </span>
                            <a class="button is-small is-naked"
                                @click.stop="toggle">
                                <span class="icon is-small">
                                    <fa icon="hourglass-end"
                                        v-if="end"/>
                                    <fa icon="hourglass-start"
                                        v-else/>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </template>
        </core-operation>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHourglassStart, faHourglassEnd, faSpinner, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';
import CoreOperation from '../../../../core/components/navbar/io/Operation.vue';

library.add(faHourglassStart, faHourglassEnd, faSpinner, faTimesCircle);

export default {
    name: 'Operation',

    components: { Avatar, CoreOperation, Fa },

    inheritAttrs: false,
};
</script>
