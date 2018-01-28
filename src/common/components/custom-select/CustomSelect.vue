<script>
import noop from '../../utils/noop';
import getElementOffsets from '../../utils/getElementOffsets';
import emptyArray from '../../utils/emptyArray';

export default {
  name: 'CustomSelect',
  props: {
    name: String,
    onChange: {
      type: Function,
      default: noop
    },
    selectedOptionId: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: emptyArray
    }
  },

  data() {
    return {
      optionsList: null,
      triggerSelect: null,
      isOpen: false,
      selectedOption: {},

      optionsListOffsetTop: 0,
      optionsListOffsetLeft: 0,
    };
  },

  methods: {
    getTopOffsetByPlacement(triggerOffsets, placement) {
      if (placement === 'top') {
        return triggerOffsets.top - this.optionsList.offsetHeight;
      }

      return triggerOffsets.top + this.triggerSelect.offsetHeight; // placement === 'bottom'
    },

    getBestFitPlacement(triggerOffsets) {
      const top = (triggerOffsets.top - this.optionsList.offsetHeight) >= 0;

      return top ? 'top' : 'bottom';
    },

    observe() {
      this.optionsList = this.$refs.optionsList;
      const triggerOffsets = getElementOffsets(this.triggerSelect);

      const placement = this.getBestFitPlacement(triggerOffsets);

      this.optionsListOffsetTop = this.getTopOffsetByPlacement(triggerOffsets, placement);
      this.optionsListOffsetLeft = triggerOffsets.left;
    },

    onCloseSelectList(event) {
      if (this.isOpen && this.optionsList && !this.optionsList.contains(event.target)) {
        this.isOpen = false;
      }
    },

    setSelectedOption(selectedOptionId) {
      this.selectedOption = this.options.find(option => option.id === selectedOptionId) || { id: '', title: '...' };
    },

    onOptionClick(event) {
      this.setSelectedOption(event.target.dataset.id)
      this.onChange(this.selectedOption, this.name);
    },

    onSelectClick(event) {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },
  },

  updated() {
    if (this.isOpen) {
      this.observe();
    }
  },

  beforeMount() {
    this.setSelectedOption(this.selectedOptionId);
  },

  mounted() {
    this.triggerSelect = this.$refs.triggerSelect;
    document.addEventListener('mousedown', this.onCloseSelectList);
    document.addEventListener('mousewheel', this.onCloseSelectList);
  },

  beforeDestroy() {
    document.removeEventListener('mousedown', this.onCloseSelectList);
    document.removeEventListener('mousewheel', this.onCloseSelectList);
  }
};
</script>

<template>
  <label :tabindex="`${disabled ? -1 : 0}`" :class="['ctrl-select', { 'disabled': disabled }]" @click="onSelectClick" ref="triggerSelect">
    <span class="option-name">{{ selectedOption.title }}</span>
    <i class="icon-select-arrows" />

    <transition name="fade">
      <ul v-if="isOpen" class="options-list scroll-box" ref="optionsList" :style="{ width: `${triggerSelect.clientWidth}px`, top: `${optionsListOffsetTop}px`, left: `${optionsListOffsetLeft}px` }">
        <li v-for="option in options" :key="option.id" :data-id="option.id" @click="onOptionClick" :class="['option', { 'selected': option.id === selectedOption.id }]">{{ option.title }}</li>
      </ul>
    </transition>
  </label>
</template>
