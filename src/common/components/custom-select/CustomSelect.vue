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
      optionsListElement: null,
      initIndexOfSelectedOption: 0,
      indexOfSelectedOption: 0,
      optionsListLength: this.options.length,
      triggerSelect: null,
      isOpen: false,
      selectedOption: this.options[0] || { id: '', title: '...' },
    };
  },

  methods: {
    scrollList(listElement) {
      if (listElement && listElement.children && listElement.children.length) {
        const optionHeght = listElement.children[0].offsetHeight;
        const midElement = (listElement.offsetHeight / optionHeght) / 2;
        listElement.scrollTop = (this.indexOfSelectedOption - midElement) * optionHeght;
      }
    },

    getTopOffsetByPlacement(triggerOffsets, placement) {
      if (placement === 'top') {
        return triggerOffsets.top - this.optionsListElement.offsetHeight;
      }

      return triggerOffsets.top + this.triggerSelect.offsetHeight; // placement === 'bottom'
    },

    getBestFitPlacement(triggerOffsets) {
      const top = (triggerOffsets.top - this.optionsListElement.offsetHeight) >= 0;

      return top ? 'top' : 'bottom';
    },

    observe() {
      this.triggerSelect = this.$refs.triggerSelect;
      this.optionsListElement = this.$refs.optionsListElement;
      const triggerOffsets = getElementOffsets(this.triggerSelect);

      this.scrollList(this.optionsListElement);

      const placement = this.getBestFitPlacement(triggerOffsets);

      this.optionsListElement.style.top = `${this.getTopOffsetByPlacement(triggerOffsets, placement)}px`;
      this.optionsListElement.style.left = `${triggerOffsets.left}px`;
      this.optionsListElement.style.width = `${this.triggerSelect.offsetWidth}px`;
    },

    setSelectedOption(selectedOptionId) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].id === selectedOptionId) {
          this.selectedOption = this.options[i];
          this.indexOfSelectedOption = i;
          this.initIndexOfSelectedOption = i;
        }
      }
    },

    onOptionClick(event) {
      this.setSelectedOption(event.target.dataset.id)
      this.onChange(this.selectedOption, this.name);
    },

    onUpDown(event) {
      // up
      if (!this.disabled && !!this.indexOfSelectedOption && event.keyCode === 38) {
        this.indexOfSelectedOption--;
        this.setOptionByUpDownButtons(!this.isOpen);
      }
      // down
      if (!this.disabled && (this.indexOfSelectedOption !== this.optionsListLength - 1) && (event.keyCode === 40)) {
        this.indexOfSelectedOption++;
        this.setOptionByUpDownButtons(!this.isOpen);
      }
    },

    setOptionByUpDownButtons(isAllowedToSet) {
      if (isAllowedToSet) {
        this.initIndexOfSelectedOption = this.indexOfSelectedOption;
        this.selectedOption = this.options[this.indexOfSelectedOption];
        this.onChange(this.selectedOption, this.name);
      }
    },

    onCloseSelectList(event) {
      if (this.isOpen && !this.triggerSelect.contains(event.target)) {
        this.isOpen = false;
        this.indexOfSelectedOption = this.initIndexOfSelectedOption;
      }
    },

    onEnterClick(event) {
      if (!this.disabled) {
        if (this.isOpen) {
          this.setOptionByUpDownButtons(this.isOpen);
          this.isOpen = false;
        } else {
          this.indexOfSelectedOption = this.initIndexOfSelectedOption;
          this.isOpen = true;
        }
      }
    },

    onMouseClick(event) {
      if (!this.disabled) {
        this.indexOfSelectedOption = this.initIndexOfSelectedOption;
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
  <label :tabindex="`${disabled ? -1 : 0}`" :class="['ctrl-select', { 'disabled': disabled }]" @keydown="onUpDown" @click="onMouseClick" @keyup.enter="onEnterClick" ref="triggerSelect">
    <span class="option-name">{{ selectedOption.title }}</span>
    <i class="icon-select-arrows" />

    <transition name="fade">
      <ul v-if="isOpen" class="options-list scroll-box" ref="optionsListElement">
        <li v-for="(option, index) in options" :key="option.id" :data-id="option.id" @click="onOptionClick" :class="['option', { 'selected': index === indexOfSelectedOption }]">{{ option.title }}</li>
      </ul>
    </transition>
  </label>
</template>
